import { articlePhotosBucket } from "@article/article.bucket";
import {
  Article,
  ArticleResponse,
  CreateArticleRequest,
  DeleteArticleResponse,
  FileUploadResponse,
  ListArticlesRequest,
  ListArticlesResponse,
  PublishArticleResponse,
  PublishedArticlesCountResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
} from "@article/article.interfaces";
import { articleRepository } from "@article/article.repository";
import { PublishedArticleTopic } from "@article/article.topic";
import busboy from "busboy";
import { APIError } from "encore.dev/api";
import log from "encore.dev/log";
import { getAuthData } from "~encore/auth";
import { user } from "~encore/clients";

class ArticleService {
  async get(id: string): Promise<ArticleResponse> {
    return await articleRepository.findById(id);
  }

  async list(params: ListArticlesRequest): Promise<ListArticlesResponse> {
    return { articles: await articleRepository.list(params) };
  }

  async create(params: CreateArticleRequest): Promise<Article> {
    // check if user exists
    const userExists = await user.getUser({ id: params.author_id });
    if (!userExists) {
      throw APIError.failedPrecondition(`User not found`).withDetails({
        userId: params.author_id,
      });
    }
    return await articleRepository.create(params);
  }

  async update(params: UpdateArticleRequest): Promise<UpdateArticleResponse> {
    const { userID = null } = getAuthData() || {};

    const article = await articleRepository.findById(params.id);
    if (article.author_id !== userID) {
      throw APIError.permissionDenied(
        "Only the author can update this article"
      );
    }

    await articleRepository.update(params);
    return { message: "Article updated" };
  }

  async delete(id: string): Promise<DeleteArticleResponse> {
    const { userID = null } = getAuthData() || {};

    const article = await articleRepository.findById(id);
    if (article.author_id !== userID) {
      throw APIError.permissionDenied(
        "Only the author can delete this article"
      );
    }

    await articleRepository.delete(id);
    return { message: "Article deleted" };
  }

  async publish(id: string): Promise<PublishArticleResponse> {
    // get article
    const article = await articleRepository.findById(id);

    // get user id
    const { userID = null } = getAuthData() || {};

    // check if user is the author
    if (article.author_id !== userID) {
      throw APIError.permissionDenied(
        "Only the author can publish this article"
      );
    }

    await articleRepository.publish(id);

    // Publish to pubsub
    log.info("Publishing article to pubsub", { articleId: id });
    const messageId = await PublishedArticleTopic.publish({
      articleId: id,
    });

    log.info("Successfully published article to pubsub", {
      articleId: id,
      messageId,
    });

    return { message: "Article published" };
  }

  async publishedArticlesCount(): Promise<PublishedArticlesCountResponse> {
    return { count: await articleRepository.publishedArticlesCount() };
  }

  async upload(req: any, res: any): Promise<FileUploadResponse> {
    log.info("Received request to upload file", { headers: req.headers });

    const bb = busboy({
      headers: req.headers,
      limits: { files: 1 },
    });

    type FileEntry = { data: any[]; filename: string; mimeType: string };
    const entry: FileEntry = { filename: "", data: [], mimeType: "" };

    return new Promise((resolve, reject) => {
      bb.on("file", (_, file, info) => {
        log.info("Received file", {
          filename: info.filename,
          mimeType: info.mimeType,
        });
        entry.mimeType = info.mimeType;
        entry.filename = info.filename;
        file
          .on("data", (data) => {
            entry.data.push(data);
          })
          .on("close", () => {
            log.info(`File ${entry.filename} received`);
          })
          .on("error", (err) => {
            bb.emit("error", err);
          });
      });

      bb.on("close", async () => {
        try {
          const buf = Buffer.concat(entry.data);

          // Create unique prefix
          const timestamp = Date.now();
          const randomString = Math.random().toString(36).substring(2, 8);
          const uniquePrefix = `${timestamp}-${randomString}`;
          const uniqueFilename = `${uniquePrefix}-${entry.filename}`;

          log.info("Going to upload file to bucket", {
            originalFilename: entry.filename,
            uniqueFilename,
            mimeType: entry.mimeType,
          });

          // Save file to bucket with prefixed filename
          const attrs = await articlePhotosBucket.upload(uniqueFilename, buf, {
            contentType: entry.mimeType,
          });
          log.info("File uploaded to bucket", { attrs });

          const publicUrl = articlePhotosBucket.publicUrl(uniqueFilename);
          log.info("Public URL", { url: publicUrl });

          const response: FileUploadResponse = {
            success: true,
            originalFilename: entry.filename,
            filename: uniqueFilename,
            mimeType: entry.mimeType,
            publicUrl,
          };

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(response));
          resolve(response);
        } catch (err) {
          bb.emit("error", err);
        }
      });

      bb.on("error", async (err) => {
        log.error("Error uploading file", { error: err });
        res.writeHead(500, {
          "Content-Type": "application/json",
          Connection: "close",
        });
        res.end(
          JSON.stringify({ success: false, error: (err as Error).message })
        );
        reject(err);
      });

      req.pipe(bb);
    });
  }
}

export const articleService = new ArticleService();

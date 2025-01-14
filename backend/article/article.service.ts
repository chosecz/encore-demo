import { articlePhotosBucket } from "@article/article.bucket";
import {
  Article,
  ArticleResponse,
  CreateArticleRequest,
  DeleteArticleResponse,
  FileUploadResponse,
  ListArticlesRequest,
  ListArticlesResponse,
  PublishArticleEvent,
  PublishArticleResponse,
  PublishedArticlesCountResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
} from "@article/article.interfaces";
import { articleRepository } from "@article/article.repository";
import busboy from "busboy";
import log from "encore.dev/log";
import { Topic } from "encore.dev/pubsub";

export const PublishedArticleTopic = new Topic<PublishArticleEvent>(
  "published-article",
  {
    deliveryGuarantee: "at-least-once",
  }
);

class ArticleService {
  async get(id: string): Promise<ArticleResponse> {
    return await articleRepository.findById(id);
  }

  async list(params: ListArticlesRequest): Promise<ListArticlesResponse> {
    return { articles: await articleRepository.list(params) };
  }

  async create(data: CreateArticleRequest): Promise<Article> {
    return await articleRepository.create(data);
  }

  async update(params: UpdateArticleRequest): Promise<UpdateArticleResponse> {
    await articleRepository.update(params);
    return { message: "Article updated" };
  }

  async delete(id: string): Promise<DeleteArticleResponse> {
    await articleRepository.delete(id);
    return { message: "Article deleted" };
  }

  async publish(id: string): Promise<PublishArticleResponse> {
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

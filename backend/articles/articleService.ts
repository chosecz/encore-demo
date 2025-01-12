import { articleRepository } from "./articleRepository";
import { Article, CreateArticleRequest, CreateArticleResponse } from "./types";

export class ArticleService {
  async list(
    includeDeleted: boolean = false,
    status?: string
  ): Promise<Article[]> {
    return articleRepository.findAll(includeDeleted, status);
  }

  async get(id: string): Promise<Article | null> {
    return articleRepository.findById(id);
  }

  async create(data: CreateArticleRequest): Promise<CreateArticleResponse> {
    return articleRepository.create(data);
  }
}

export const articleService = new ArticleService();

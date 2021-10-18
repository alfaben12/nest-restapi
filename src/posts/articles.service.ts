import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Article } from "./entities/article.entity";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private postsRepository: Repository<Article>
  ) {}

  create(createArticleDto: CreateArticleDto) {
    return this.postsRepository.save(createArticleDto);
  }

  async findAll(): Promise<any> {
    return await paginate<Article>(this.postsRepository, { limit: 1, page: 1 });
    // return this.postsRepository.find({ relations: ["user", "category"] });
  }

  findOne(id: number): Promise<Article> {
    return this.postsRepository.findOne(id);
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto
  ): Promise<Article> {
    await this.postsRepository.update(id, updateArticleDto);
    return this.postsRepository.findOne(id);
  }

  remove(id: number): Promise<Article> {
    const data = this.postsRepository.findOne(id);
    this.postsRepository.delete(id);
    return data;
  }
}

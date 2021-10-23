import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate } from "nestjs-typeorm-paginate";
import { UtilsService } from "src/utils/utils.service";
import { Like, Repository } from "typeorm";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Article } from "./entities/article.entity";

@Injectable()
export class ArticlesService {
  constructor(
    private readonly utilsService: UtilsService,

    @InjectRepository(Article)
    private articlesRepository: Repository<Article>
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const created = await this.articlesRepository.save(createArticleDto);
    const result = await this.articlesRepository.findOne(created.id, {
      relations: ["category", "user"],
    });

    return result;
  }

  async findAll(
    page: string,
    limit: string,
    sort: string,
    keyword: string
  ): Promise<any> {
    const parseSorting = this.utilsService.sortJsonApiParse(sort);
    const result = await paginate<Article>(
      this.articlesRepository,
      {
        limit,
        page,
        route: "/articles",
      },
      {
        where: [
          {
            title: Like(`%${keyword}%`),
          },
          {
            body: Like(`%${keyword}%`),
          },
        ],
        order: parseSorting,
        relations: ["user", "category"],
      }
    );

    result["sort"] = parseSorting;
    return result;
  }

  findOne(id: number): Promise<Article> {
    return this.articlesRepository.findOne(id, {
      relations: ["category", "user"],
    });
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto
  ): Promise<Article> {
    await this.articlesRepository.update(id, updateArticleDto);
    const result = await this.articlesRepository.findOne(id, {
      relations: ["category", "user"],
    });

    return result;
  }

  async remove(id: number): Promise<Article> {
    const result = await this.articlesRepository.findOne(id, {
      relations: ["category", "user"],
    });
    this.articlesRepository.delete(id);
    return result;
  }
}

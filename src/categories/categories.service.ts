import { Injectable, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";
import { deserialize } from "deserialize-json-api";
import { Like } from "typeorm";
import { UtilsService } from "src/utils/utils.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";

@Injectable()
@UseGuards(JwtAuthGuard)
export class CategoriesService {
  constructor(
    private readonly utilsService: UtilsService,

    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const created = await this.categoriesRepository.save(createCategoryDto);
    const result = await this.categoriesRepository.findOne(created.id);

    return result;
  }

  async findAll(
    page: string,
    limit: string,
    sort: string,
    keyword: string
  ): Promise<any> {
    const parseSorting = this.utilsService.sortJsonApiParse(sort);
    const result = await paginate<Category>(
      this.categoriesRepository,
      {
        limit,
        page,
        route: "/categories",
      },
      {
        where: [
          {
            name: Like(`%${keyword}%`),
          },
          {
            description: Like(`%${keyword}%`),
          },
        ],
        order: parseSorting,
        relations: ["articles"],
      }
    );

    result["sort"] = parseSorting;
    return result;
  }

  findOne(id: number): Promise<Category> {
    return this.categoriesRepository.findOne(id, { relations: ["articles"] });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    await this.categoriesRepository.update(id, updateCategoryDto);
    return await this.categoriesRepository.findOne(id, {
      relations: ["articles"],
    });
  }

  async remove(id: number): Promise<Category> {
    const result = await this.categoriesRepository.findOne(id, {
      relations: ["articles"],
    });
    this.categoriesRepository.delete(id);
    return result;
  }
}

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

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepository.save(createCategoryDto);
  }

  async findAll(page: string, limit: string, sort: string, keyword: string) {
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

  findOne(id: number) {
    return this.categoriesRepository.findOne(id, { relations: ["articles"] });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    const data = this.categoriesRepository.findOne(id, {
      relations: ["articles"],
    });
    this.categoriesRepository.delete(id);
    return data;
  }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { deserialize } from "deserialize-json-api";
import { Like } from "typeorm";
import { UtilsService } from "src/utils/utils.service";

@Injectable()
export class CategoriesService {
  constructor(
    private readonly utilsService: UtilsService,

    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return "This action adds a new category";
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
      }
    );

    result["sort"] = parseSorting;

    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

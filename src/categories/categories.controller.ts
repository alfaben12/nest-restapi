import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Query,
  Post,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import JSONAPISerializer = require("json-api-serializer");
import { User } from "src/users/entities/user.entity";
import { Category } from "./entities/category.entity";
import { Article } from "src/articles/entities/article.entity";

@Controller({ path: "categories", version: "1" })
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll(@Query() query) {
    const { page, limit, sort, keyword } = query;
    const result = await this.categoriesService.findAll(
      page,
      limit,
      sort,
      keyword
    );

    const Serializer = new JSONAPISerializer();
    const data = result.items;
    Serializer.register("category", {
      id: "id",
      links: {
        self: function (data) {
          const { id } = data as Category;
          return "/categories/" + id;
        },
        ...result.links,
      },
      relationships: {
        articles: {
          type: "article",
        },
      },
      topLevelMeta: function (data: string | any[], extraData: { count: any }) {
        return { ...result.meta };
      },
      topLevelLinks: {
        self: "/categories",
        ...result.links,
      },
    });

    Serializer.register("article", {
      id: "id",
      links: {
        self: function (article: Article) {
          const { id } = article;
          return "/articles/" + id;
        },
      },
      relationships: {
        user: {
          type: "user",
        },
      },
    });

    // Register 'article' type
    Serializer.register("user", {
      id: "id",
      links: {
        self: function (user: User) {
          const { id } = user;
          return "/users/" + id;
        },
      },
    });

    const resultSerializer = Serializer.serialize("category", data);
    return resultSerializer;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Query,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import JSONAPISerializer = require("json-api-serializer");
import { User } from "src/users/entities/user.entity";
import { Category } from "./entities/category.entity";
import { Article } from "src/articles/entities/article.entity";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";

@Controller({ path: "categories", version: "1" })
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const result = await this.categoriesService.create(createCategoryDto);

    const Serializer = new JSONAPISerializer();
    const data = result;
    Serializer.register("category", {
      id: "id",
      links: {
        self: function (data: Category) {
          const { id } = data;
          return "/categories/" + id;
        },
      },
      relationships: {
        articles: {
          type: "article",
        },
      },
      topLevelLinks: {
        self: "/categories",
      },
    });
    const resultSerializer = Serializer.serialize("category", data);
    return resultSerializer;
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
        self: function (data: Category) {
          const { id } = data;
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
        self: function (data: Article) {
          const { id } = data;
          return "/articles/" + id;
        },
      },
      relationships: {
        user: {
          type: "user",
        },
      },
    });

    Serializer.register("user", {
      id: "id",
      links: {
        self: function (data: User) {
          const { id } = data;
          return "/users/" + id;
        },
      },
    });

    const resultSerializer = Serializer.serialize("category", data);
    return resultSerializer;
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const result = await this.categoriesService.findOne(+id);

    const Serializer = new JSONAPISerializer();
    const data = result;
    Serializer.register("category", {
      id: "id",
      links: {
        self: function (data: Category) {
          const { id } = data;
          return "/categories/" + id;
        },
      },
      relationships: {
        articles: {
          type: "article",
        },
      },
      topLevelLinks: {
        self: "/categories",
      },
    });

    Serializer.register("article", {
      id: "id",
      links: {
        self: function (data: Article) {
          const { id } = data;
          return "/articles/" + id;
        },
      },
      relationships: {
        user: {
          type: "user",
        },
      },
    });

    Serializer.register("user", {
      id: "id",
      links: {
        self: function (data: User) {
          const { id } = data;
          return "/users/" + id;
        },
      },
    });

    const resultSerializer = Serializer.serialize("category", data);
    return resultSerializer;
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    const result = await this.categoriesService.update(+id, updateCategoryDto);

    const Serializer = new JSONAPISerializer();
    const data = result;
    Serializer.register("category", {
      id: "id",
      links: {
        self: function (data: Category) {
          const { id } = data;
          return "/categories/" + id;
        },
      },
      relationships: {
        articles: {
          type: "article",
        },
      },
      topLevelLinks: {
        self: "/categories",
      },
    });

    Serializer.register("article", {
      id: "id",
      links: {
        self: function (data: Article) {
          const { id } = data;
          return "/articles/" + id;
        },
      },
      relationships: {
        user: {
          type: "user",
        },
      },
    });

    Serializer.register("user", {
      id: "id",
      links: {
        self: function (data: User) {
          const { id } = data;
          return "/users/" + id;
        },
      },
    });

    const resultSerializer = Serializer.serialize("category", data);
    return resultSerializer;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const result = await this.categoriesService.remove(+id);

    const Serializer = new JSONAPISerializer();
    const data = result;
    Serializer.register("category", {
      id: "id",
      links: {
        self: function (data: Category) {
          const { id } = data;
          return "/categories/" + id;
        },
      },
      relationships: {
        articles: {
          type: "article",
        },
      },
      topLevelLinks: {
        self: "/categories",
      },
    });

    Serializer.register("article", {
      id: "id",
      links: {
        self: function (data: Article) {
          const { id } = data;
          return "/articles/" + id;
        },
      },
      relationships: {
        user: {
          type: "user",
        },
      },
    });

    Serializer.register("user", {
      id: "id",
      links: {
        self: function (data: User) {
          const { id } = data;
          return "/users/" + id;
        },
      },
    });

    const resultSerializer = Serializer.serialize("category", data);
    return resultSerializer;
  }
}

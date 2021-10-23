import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Post,
  Query,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { Article } from "./entities/article.entity";
import JSONAPISerializer = require("json-api-serializer");
import { UtilsService } from "src/utils/utils.service";

@Controller({ path: "articles", version: "1" })
@UseGuards(JwtAuthGuard, RolesGuard)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    const result = await this.articlesService.create(createArticleDto);

    const Serializer = new JSONAPISerializer();
    const data = result;
    Serializer.register("article", {
      id: "id",
      links: {
        self: function (data: Article) {
          const { id } = data;
          return "/articles/" + id;
        },
      },
      relationships: {
        category: {
          type: "category",
        },
        user: {
          type: "user",
        },
      },
      topLevelLinks: {
        self: "/articles",
      },
    });

    Serializer.register("category", {
      id: "id",
      links: {
        self: function (data: Category) {
          const { id } = data;
          return "/categories/" + id;
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

    const resultSerializer = Serializer.serialize("article", data);
    return resultSerializer;
  }

  @Get()
  async findAll(@Query() query) {
    const { page, limit, sort, keyword } = query;
    const result = await this.articlesService.findAll(
      page,
      limit,
      sort,
      keyword
    );

    const Serializer = new JSONAPISerializer();
    const data = result.items;
    Serializer.register("article", {
      id: "id",
      links: {
        self: function (data: Article) {
          const { id } = data;
          return "/articles/" + id;
        },
        ...result.links,
      },
      relationships: {
        category: {
          type: "article",
        },
        user: {
          type: "user",
        },
      },
      topLevelMeta: function (data: string | any[], extraData: { count: any }) {
        return { ...result.meta };
      },
      topLevelLinks: {
        self: "/articles",
        ...result.links,
      },
    });

    Serializer.register("category", {
      id: "id",
      links: {
        self: function (data: Category) {
          const { id } = data;
          return "/category/" + id;
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

    const resultSerializer = Serializer.serialize("article", data);
    return resultSerializer;
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const result = await this.articlesService.findOne(+id);

    if (!result) {
      throw new HttpException(
        {
          code: "-1000D",
          message: ["Data tidak ditemukan"],
        },
        HttpStatus.NOT_FOUND
      );
    }

    const Serializer = new JSONAPISerializer();
    const data = result;
    Serializer.register("article", {
      id: "id",
      links: {
        self: function (data: Article) {
          const { id } = data;
          return "/articles/" + id;
        },
      },
      relationships: {
        category: {
          type: "category",
        },
        user: {
          type: "user",
        },
      },
      topLevelLinks: {
        self: "/articles",
      },
    });

    Serializer.register("category", {
      id: "id",
      links: {
        self: function (data: Category) {
          const { id } = data;
          return "/categories/" + id;
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

    const resultSerializer = Serializer.serialize("article", data);
    return resultSerializer;
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    const result = await this.articlesService.update(id, updateArticleDto);

    if (!result) {
      throw new HttpException(
        {
          code: "-1000D",
          message: ["Data tidak ditemukan"],
        },
        HttpStatus.NOT_FOUND
      );
    }

    const Serializer = new JSONAPISerializer();
    const data = result;
    Serializer.register("article", {
      id: "id",
      links: {
        self: function (data: Article) {
          const { id } = data;
          return "/articles/" + id;
        },
      },
      relationships: {
        category: {
          type: "category",
        },
        user: {
          type: "user",
        },
      },
      topLevelLinks: {
        self: "/articles",
      },
    });

    Serializer.register("category", {
      id: "id",
      links: {
        self: function (data: Category) {
          const { id } = data;
          return "/categories/" + id;
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

    const resultSerializer = Serializer.serialize("article", data);
    return resultSerializer;
  }

  @Delete(":id")
  async remove(@Param("id") id: number) {
    const result = await this.articlesService.remove(id);

    if (!result) {
      throw new HttpException(
        {
          code: "-1000D",
          message: ["Data tidak ditemukan"],
        },
        HttpStatus.NOT_FOUND
      );
    }

    const Serializer = new JSONAPISerializer();
    const data = result;
    Serializer.register("article", {
      id: "id",
      links: {
        self: function (data: Article) {
          const { id } = data;
          return "/articles/" + id;
        },
      },
      relationships: {
        category: {
          type: "category",
        },
        user: {
          type: "user",
        },
      },
      topLevelLinks: {
        self: "/articles",
      },
    });

    Serializer.register("category", {
      id: "id",
      links: {
        self: function (data: Category) {
          const { id } = data;
          return "/categories/" + id;
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

    const resultSerializer = Serializer.serialize("article", data);
    return resultSerializer;
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import JSONAPISerializer = require("json-api-serializer");
import { Article } from "src/articles/entities/article.entity";
import { User } from "./entities/user.entity";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";

@Controller({ path: "users", version: "1" })
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);

    const Serializer = new JSONAPISerializer();
    const data = result;
    Serializer.register("user", {
      id: "id",
      links: {
        self: function (data: Article) {
          const { id } = data;
          return "/articles/" + id;
        },
      },
      relationships: {
        articles: {
          type: "article",
        },
      },
      topLevelLinks: {
        self: "/users",
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
    });

    const resultSerializer = Serializer.serialize("user", data);
    return resultSerializer;
  }

  @Get()
  async findAll(@Query() query) {
    const { page, limit, sort, keyword } = query;
    const result = await this.usersService.findAll(page, limit, sort, keyword);

    const Serializer = new JSONAPISerializer();
    const data = result.items;
    Serializer.register("user", {
      id: "id",
      links: {
        self: function (data: User) {
          const { id } = data;
          return "/users/" + id;
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
        self: "/users",
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
    });

    const resultSerializer = Serializer.serialize("user", data);
    return resultSerializer;
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const result = await this.usersService.findOne(+id);

    const Serializer = new JSONAPISerializer();
    const data = result;
    Serializer.register("user", {
      id: "id",
      links: {
        self: function (data: User) {
          const { id } = data;
          return "/users/" + id;
        },
      },
      relationships: {
        articles: {
          type: "article",
        },
      },
      topLevelLinks: {
        self: "/users",
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
    });

    const resultSerializer = Serializer.serialize("user", data);
    return resultSerializer;
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(+id, updateUserDto);

    const Serializer = new JSONAPISerializer();
    const data = result;
    Serializer.register("user", {
      id: "id",
      links: {
        self: function (data: User) {
          const { id } = data;
          return "/users/" + id;
        },
      },
      relationships: {
        articles: {
          type: "article",
        },
      },
      topLevelLinks: {
        self: "/users",
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
    });

    const resultSerializer = Serializer.serialize("user", data);
    return resultSerializer;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const result = await this.usersService.remove(+id);

    const Serializer = new JSONAPISerializer();
    const data = result;
    Serializer.register("user", {
      id: "id",
      links: {
        self: function (data: User) {
          const { id } = data;
          return "/users/" + id;
        },
      },
      relationships: {
        articles: {
          type: "article",
        },
      },
      topLevelLinks: {
        self: "/users",
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
    });

    const resultSerializer = Serializer.serialize("user", data);
    return resultSerializer;
  }
}

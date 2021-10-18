import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";
import JSONAPISerializer = require("json-api-serializer");
import { User } from "src/users/entities/user.entity";
import { Post } from "src/posts/entities/post.entity";
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

    const Serializer = new JSONAPISerializer();
    const data = result.items;
    Serializer.register("category", {
      id: "id", // The attributes to use as the reference. Default = 'id'.
      blacklist: ["updated"], // An array of blacklisted attributes. Default = []
      links: {
        // An object or a function that describes links.
        self: function (data) {
          const { id } = data as Category;
          // Can be a function or a string value ex: { self: '/articles/1'}
          return "/categories/" + id;
        },
        ...result.links,
      },
      relationships: {
        // An object defining some relationships.
        posts: {
          type: "post",
        },
      },
      topLevelMeta: function (data: string | any[], extraData: { count: any }) {
        // An object or a function that describes top level meta.
        return { ...result.meta };
      },
      topLevelLinks: {
        // An object or a function that describes top level links.
        self: "/categories", // Can be a function (with extra data argument) or a string value
        ...result.links,
      },
    });

    // Register 'post' type
    Serializer.register("post", {
      id: "id",
      links: {
        self: function (post: Post) {
          const { id } = post;
          return "/posts/" + id;
        },
      },
      relationships: {
        // An object defining some relationships.
        user: {
          type: "user",
        },
      },
    });

    // Register 'post' type
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

    // const deserialize1 = deserialize(result);
    return resultSerializer;
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

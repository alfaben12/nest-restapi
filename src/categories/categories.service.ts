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
// import { Serializer } from "jsonapi-serializer";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return "This action adds a new category";
  }

  async findAll() {
    const results = await paginate<Category>(this.categoriesRepository, {
      limit: 2,
      page: 1,
      route: "/categories",
    });

    const Serializer = new JSONAPISerializer();
    const data = results.items;
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
      },
      relationships: {
        // An object defining some relationships.
        posts: {
          type: "post",
          deserializer: (data) => data,
        },
      },
      topLevelMeta: function (data: string | any[], extraData: { count: any }) {
        // An object or a function that describes top level meta.
        return { ...results.meta, ...results.links };
      },
      topLevelLinks: {
        // An object or a function that describes top level links.
        self: "/categories", // Can be a function (with extra data argument) or a string value
      },
    });

    // Register 'post' type
    Serializer.register("post", {
      id: "id",
      relationships: {
        // An object defining some relationships.
        user: {
          type: "user",
          links: {
            self: function (post: Post) {
              const { id } = post.user as User;
              return "/users/" + id;
            },
          },
        },
      },
    });

    // Register 'post' type
    Serializer.register("user", {
      id: "id",
    });

    const result = Serializer.serialize("category", data, { count: 2 });

    // const deserialize = Serializer.deserialize("category", result);
    return deserialize;
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

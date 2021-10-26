import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate } from "nestjs-typeorm-paginate";
import { UtilsService } from "src/utils/utils.service";
import { Like, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    private readonly utilsService: UtilsService,

    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const created = await this.usersRepository.save(createUserDto);
    return this.usersRepository.findOne(created.id, {
      relations: ["articles"],
    });
  }

  async findAll(
    page: string,
    limit: string,
    sort: string,
    keyword: string
  ): Promise<any> {
    const parseSorting = this.utilsService.sortJsonApiParse(sort);
    const result = await paginate<User>(
      this.usersRepository,
      {
        limit,
        page,
        route: "/users",
      },
      {
        where: [
          {
            name: Like(`%${keyword}%`),
          },
          {
            role: Like(`%${keyword}%`),
          },
        ],
        order: parseSorting,
        relations: ["articles"],
      }
    );

    result["sort"] = parseSorting;
    return result;
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id, { relations: ["articles"] });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return await this.usersRepository.findOne(id, {
      relations: ["articles"],
    });
  }

  async remove(id: number): Promise<User> {
    const result = await this.usersRepository.findOne(id, {
      relations: ["articles"],
    });
    this.usersRepository.delete(id);
    return result;
  }

  findBySignin(email: string, password: string): Promise<User> {
    return this.usersRepository.findOne({ email, password });
  }
}

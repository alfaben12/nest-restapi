import { Injectable } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AccountsService {
  constructor(private readonly userService: UsersService) {}

  async findBySignin(email: string, password: string): Promise<User | null> {
    return await this.userService.findBySignin(email, password);
  }
}

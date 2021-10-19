import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccountsService } from "src/accounts/accounts.service";
import { User } from "src/users/entities/user.entity";
import { SigninDto } from "./dto/signin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService
  ) {}

  async signin(signinDto: SigninDto) {
    const account: User = await this.accountsService.findBySignin(
      signinDto.email,
      signinDto.password
    );

    const payload = { sub: account.id, name: account.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Body } from "@nestjs/common";
import { SigninDto } from "./dto/signin.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RolesGuard } from "./guards/roles.guard";
import JSONAPISerializer = require("json-api-serializer");

@Controller({ path: "auth", version: "1" })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signin")
  async login(@Body() signinDto: SigninDto) {
    const result = await this.authService.signin(signinDto);

    if (!result) {
      throw new HttpException(
        {
          code: "-1000C",
          message: ["Akun tidak ditemukan"],
        },
        HttpStatus.NOT_FOUND
      );
    }

    const data = result.account;
    const Serializer = new JSONAPISerializer();
    Serializer.register("account", {
      id: "id",
      links: {
        self: function (user) {
          return `/users/${user.id}`;
        },
      },
    });

    const resultSerializer = Serializer.serialize("account", data);
    return resultSerializer;
  }
}

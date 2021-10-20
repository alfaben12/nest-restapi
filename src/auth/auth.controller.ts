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

@Controller({ path: "auth", version: "1" })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signin")
  async login(@Body() signinDto: SigninDto) {
    const result = this.authService.signin(signinDto);

    if (!result) {
      throw new HttpException(
        {
          message: ["Akun tidak ditemukan"],
        },
        HttpStatus.NOT_FOUND
      );
    }

    return result;
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard, RolesGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}

import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { RoutesService } from "src/routes/routes.service";
import { UsersService } from "src/users/users.service";
import JSONAPISerializer = require("json-api-serializer");

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly routesService: RoutesService
  ) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context;
    return this.validateRequest(request);
  }

  async validateRequest(execContext: ExecutionContext): Promise<boolean> {
    const request = execContext.switchToHttp().getRequest();
    const userPayload = request.user;
    const user = await this.usersService.findOne(userPayload.id);
    const userRole = user.role;

    const path = request.route?.path;
    const method = request.route?.stack[0].method;
    const route = await this.routesService.findOne(path, method);

    if (!route) {
      throw new HttpException(
        {
          detail: ["Silahkan sinkronasi link pada aplikasi"],
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const isAllowAccess: boolean = route.role.includes(userRole);
    if (isAllowAccess) {
      return true;
    } else {
      throw new HttpException(
        {
          message: [
            "Akses ditolak",
            `Role yang diberi akses ${route.role.toString()}`,
          ],
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

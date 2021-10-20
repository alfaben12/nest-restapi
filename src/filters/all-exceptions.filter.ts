import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { CustomError } from "./entity/custom-error.entity";
import { getHttpTitle } from "./enums/http-title.enum";
import JSONAPISerializer = require("json-api-serializer");

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const isErrorFromController: boolean = exception instanceof HttpException;

    const title = getHttpTitle(status);
    const user = request.user?.id ?? null;

    // INIT RESPONSE && NEVER RETURN THIS RESPONSE
    let responseFinal: CustomError = {
      id: 0,
      links: {
        about: request.url,
      },
      code: null,
      statusCode: status,
      title,
      detail: ["Server sedang bermasalah"],
      meta: {
        time: new Date().getTime(),
        user,
      },
    };

    if (isErrorFromController) {
      // ERROR FROM CONTROLLER
      const errorFromController =
        exception instanceof HttpException ? exception.getResponse() : "";
      responseFinal = {
        id: errorFromController["id"] ?? null,
        links: {
          about: request.url,
        },
        code: errorFromController["code"] ?? null,
        statusCode: status,
        title,
        detail: errorFromController["message"],
        meta: {
          time: new Date().getTime(),
          user,
        },
      };
    } else {
      // OTHER ERROR
      responseFinal = {
        id: 0,
        links: {
          about: request.url,
        },
        code: null,
        statusCode: status,
        title,
        detail: [exception["message"]],
        meta: {
          time: new Date().getTime(),
          user,
        },
      };
    }

    const Serializer = new JSONAPISerializer();
    const errorSerialize = Serializer.serializeError(responseFinal);
    response.status(status).json(errorSerialize);
  }
}

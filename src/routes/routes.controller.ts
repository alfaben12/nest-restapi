import { Controller, Get, Post, Request } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { Request as ExpressRequest, Router } from 'express';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@Controller({ path: 'routes', version: '1' })
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post('sync')
  async sync(@Request() req: ExpressRequest) {
    const router = req.app._router as Router;

    let countNewRoute: number = 0;
    let newRouteArray: string[] = [];

    // NON ACTIVE ALLL ROUTES
    await this.routesService.updateNonActiveAll();
    router.stack.map(async (layer) => {
      if (layer.route) {
        const path = layer.route?.path;
        const method = layer.route?.stack[0].method;
        const checkAlreadyExist: boolean = await this.routesService.findOne(
          path,
          method,
        ) ? true : false;

        if (!checkAlreadyExist) {
          const createRouteDto: CreateRouteDto = new CreateRouteDto();
          createRouteDto.path = path;
          createRouteDto.method = method;
          createRouteDto.isActive = true;
          createRouteDto.role = ['ADMIN'];

          await this.routesService.create(createRouteDto);
          newRouteArray.push(`${path} - ${method}`)
          countNewRoute++
          console.log(countNewRoute)
        }

        const updateRouteDto: UpdateRouteDto = new UpdateRouteDto();
        updateRouteDto.isActive = true;

        // UPDATE ACTIVE ROUTE
        await this.routesService.updateActive(path, method, updateRouteDto);
      }
    });

    return {
      countNewRoute,
      newRouteArray
    };
  }

  @Get()
  findAll() {
    return this.routesService.findAll();
  }
}

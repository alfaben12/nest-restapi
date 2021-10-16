import { Controller, Post, Request } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { Request as ExpressRequest, Router } from 'express';
import { CreateRouteDto } from './dto/create-route.dto';

@Controller({ path: 'routes', version: '1' })
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post('sync')
  async sync(@Request() req: ExpressRequest) {
    const router = req.app._router as Router;
    const routes: any = [];

    const alreadySavedRoutes = await this.routesService.findAll();
    router.stack.map(async (layer) => {
      if (layer.route) {
        const path = layer.route?.path;
        const method = layer.route?.stack[0].method;
        // const checkAlreadyExist = await this.routesService.findOne(
        //   path,
        //   method,
        // );

        // if (checkAlreadyExist) {
        //   const updateRouteDto: UpdateRouteDto = new UpdateRouteDto();
        //   updateRouteDto.isActive = false;

        //   await this.routesService.updateActive(path, updateRouteDto);
        // } else {
          const createRouteDto: CreateRouteDto = new CreateRouteDto();
          createRouteDto.path = path;
          createRouteDto.method = method;
          createRouteDto.isActive = true;
          createRouteDto.role = ['ADMIN'];

          this.routesService.create(createRouteDto);
        // }

        routes.push({
          path,
          method,
        });
      }
    });

    const results = routes.filter(
      ({ path: id1 }) =>
        !alreadySavedRoutes.some(({ path: id2 }) => id2 === id1),
    );

    return alreadySavedRoutes;
  }
}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, getManager, getRepository, Repository } from "typeorm";
import { CreateRouteDto } from "./dto/create-route.dto";
import { UpdateRouteDto } from "./dto/update-route.dto";
import { Route } from "./entities/route.entity";

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private routesRepository: Repository<Route>
  ) {}

  findAll() {
    return this.routesRepository.find({ select: ["path", "method", "role"], where: { isActive:true } });
  }

  create(createRouteDto: CreateRouteDto) {
    return this.routesRepository.save(createRouteDto);
  }

  findOne(path: string, method: string): Promise<Route> {
    return this.routesRepository.findOne({ path, method });
  }

  async updateNonActiveAll(): Promise<Boolean> {
    return (await getConnection()
      .createQueryBuilder()
      .update(Route)
      .set({ isActive: false })
      .execute())
      ? true
      : false;
  }

  async updateActive(
    path: string,
    method: string,
    updateRouteDto: UpdateRouteDto
  ): Promise<Route> {
    await this.routesRepository.update({ path, method }, updateRouteDto);
    return this.routesRepository.findOne({ path, method });
  }
}

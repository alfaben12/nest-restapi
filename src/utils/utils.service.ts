import { Injectable } from "@nestjs/common";
import { SortJsonApiParse } from "./entities/sort-jsonapi-parse.entity";

@Injectable()
export class UtilsService {
  sortJsonApiParse(sort: string): SortJsonApiParse {
    const sorting = sort.includes("-") ? "DESC" : "ASC";
    const column = sort.replace("-", "");
    const obj = {};
    obj[column] = sorting;
    return obj;
  }
}

import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsString,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";

class TagDetailDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;
}

export class CreatePostDto {
  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  category: Category;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  body: string;

  @IsString()
  description: string;

  //   @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TagDetailDto)
  tags: TagDetailDto[];

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => TagDetailDto)
  tag: TagDetailDto;
}

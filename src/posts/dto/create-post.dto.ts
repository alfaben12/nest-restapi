import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';

class TagDetailDto {
  @IsDefined()
  @IsString()
  @MinLength(5)
  name: string;

  @IsDefined()
  @IsString()
  @MinLength(10)
  description: string;
}

export class CreatePostDto {
  @IsDefined()
  user: User;

  @IsDefined()
  category: Category;

  @IsDefined()
  @IsString()
  @MinLength(10)
  title: string;

  @IsDefined()
  @IsString()
  @MinLength(10)
  body: string;

  @IsDefined()
  @IsString()
  description: string;

  //   @IsBoolean()
  isActive: boolean;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TagDetailDto)
  tags: TagDetailDto[];

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => TagDetailDto)
  tag: TagDetailDto;
}

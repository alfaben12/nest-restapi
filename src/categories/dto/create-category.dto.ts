import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;

  isActive?: number;
}

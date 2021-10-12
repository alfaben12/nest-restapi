import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateRouteDto {
  @IsNotEmpty()
  @IsString()
  method: string;

  @IsNotEmpty()
  @IsString()
  path: string;

  @IsNotEmpty()
  @IsString()
  isActive: boolean;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  role: string[];
}

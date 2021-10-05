import { IsDefined, IsString, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @MinLength(10)
  name: string;

  @IsDefined()
  @IsEmail()
  email: string;
}

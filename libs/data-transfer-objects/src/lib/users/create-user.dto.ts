import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  confirmPassword: string;
}

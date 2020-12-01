import { IsString, MinLength } from 'class-validator';

export class CreateTagDTO {
  @IsString()
  @MinLength(2)
  name: string;
}

import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { TagDTO } from './tag.dto';

export class CreatePostDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(70)
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsArray()
  tags: TagDTO[];
}

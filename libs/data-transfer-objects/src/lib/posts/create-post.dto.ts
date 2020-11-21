import { TagDTO } from './tag.dto';

export class CreatePostDTO {
  title: string;
  body: string;
  tags: TagDTO['id'][];
}

import { UserDTO } from '../users/user.dto';
import { TagDTO } from './tag.dto';

export class PostDTO {
  id: number;
  title: string;
  body: string;
  creationDate: Date;
  tags: TagDTO['id'][];
  authorId: UserDTO['id'][];
}

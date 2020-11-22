import { UserDTO } from '../users/user.dto';
import { TagDTO } from './tag.dto';

export class PostDTO {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  tags: TagDTO[];
  authorId: UserDTO['id'];
}

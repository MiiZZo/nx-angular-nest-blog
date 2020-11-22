import { UserDTO } from '../users/user.dto';

export class CommentDTO {
  id: number;
  text: string;
  authorId: UserDTO['id'];
  createdAt: Date;
}

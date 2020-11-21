import { UserDTO } from '../users/user.dto';

export class CommentDTO {
  id: number;
  text: string;
  author: UserDTO;
  createdAt: Date;
}

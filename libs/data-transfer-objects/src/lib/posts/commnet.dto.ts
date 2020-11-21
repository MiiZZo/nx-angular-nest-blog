import { UserDTO } from '../users/user.dto';

export class CommentDTO {
  id: number;
  text: string;
  authourId: UserDTO['id'];
  creationDate: Date;
}

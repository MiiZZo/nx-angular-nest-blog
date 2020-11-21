import { PostDTO } from '../posts/post.dto';

export class UserDTO {
  id: number;
  email: string;
  name: string;
  posts: PostDTO[];
}

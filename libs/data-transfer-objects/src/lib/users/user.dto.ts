import { CommentDTO } from '../posts/commnet.dto';
import { PostDTO } from '../posts/post.dto';

export interface UserDTO {
  id: number;
  email: string;
  name: string;
  posts: PostDTO[];
  createdAt: Date;
  comments: CommentDTO[];
}

import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';

@Entity()
export class Bookmark {
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.bookmarks, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => Post, (post) => post.bookmarks, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: 'postId' })
  post: Post;
}

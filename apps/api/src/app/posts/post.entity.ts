import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from './comment.entity';
import { PostVote } from './post-vote.entity';
import { Tag } from '../tags/tag.entity';
import { Bookmark } from './bookmark.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  previewBody: string;

  @Column()
  body: string;

  @Column()
  authorId: number;

  @ManyToOne(() => User, (user) => user.posts, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => PostVote, (postVote) => postVote.post)
  votes: PostVote[];

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Bookmark, (Bookmark) => Bookmark.postId)
  bookmarks: Bookmark[];

  @CreateDateColumn()
  createdAt: Date;
}

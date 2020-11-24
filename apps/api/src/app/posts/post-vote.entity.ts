import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from './post.entity';

@Entity()
export class PostVote {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  @Column()
  postId: number;

  @ManyToOne(() => Post, (post) => post.votes, { primary: true, cascade: true })
  @JoinColumn({ name: 'postId' })
  post: Post;

  @PrimaryColumn()
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.postVotes, {
    primary: true,
    cascade: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'enum',
    enum: [1, -1],
  })
  value: 1 | -1;
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { PostVote } from './post-vote.entity';
import { Bookmark } from './bookmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, PostVote, Bookmark])],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}

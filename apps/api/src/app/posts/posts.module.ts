import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, Tag])],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}

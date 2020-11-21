import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import {
  CommentDTO,
  CreateCommentDTO,
  CreatePostDTO,
  PostDTO,
} from '@trombonix/data-transfer-objects';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('id')
  async getPost(@Param('id') id: number): Promise<PostDTO> {
    return this.postsService.getPost(id);
  }

  @Post()
  async createPost(@Body() createPostDTO: CreatePostDTO): Promise<PostDTO> {
    return await this.postsService.createPost(createPostDTO);
  }

  @Delete('id')
  async deletePost(@Param('id') id: number): Promise<DeleteResult> {
    return this.postsService.deletePost(id);
  }

  @Post(':id/comments')
  async createComment(
    @Param('id') id: number,
    @Body() CreateCommentDTO: CreateCommentDTO
  ): Promise<CommentDTO> {
    return await this.postsService.createComment(id, CreateCommentDTO);
  }

  @Delete('comments/:id')
  async deleteComment(@Param('id') id: number): Promise<DeleteResult> {
    return await this.postsService.deleteComment(id);
  }
}

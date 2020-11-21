import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreatePostDTO, PostDTO } from '@trombonix/data-transfer-objects';
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
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import {
  CommentDTO,
  CreateCommentDTO,
  CreatePostDTO,
  PostDTO,
} from '@trombonix/data-transfer-objects';
import { PostsService } from './posts.service';
import { IsAuthorizedGuard } from '../auth/shared/is-authorized.guard';
import { ShouldSkipAuth } from '../auth/shared/should-skip-auth/should-skip-auth.decorator';

@UseGuards(IsAuthorizedGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ShouldSkipAuth()
  @Get(':id')
  async getPost(@Param('id') id: number): Promise<PostDTO> {
    return this.postsService.getPost(id);
  }

  @Post()
  async createPost(
    @Req() req: any,
    @Body() createPostDTO: CreatePostDTO
  ): Promise<PostDTO> {
    const userId = req.session.userId;

    return await this.postsService.createPost(userId, createPostDTO);
  }

  @Delete('id')
  async deletePost(
    @Req() req: any,
    @Param('id') id: number
  ): Promise<DeleteResult> {
    const userId = req.session.userId;

    return this.postsService.deletePost(userId, id);
  }

  @Post(':id/comments')
  async createComment(
    @Req() req: any,
    @Param('id') id: number,
    @Body() CreateCommentDTO: CreateCommentDTO
  ): Promise<CommentDTO> {
    const userId = req.session.userId;

    return await this.postsService.createComment(userId, id, CreateCommentDTO);
  }

  @Delete('comments/:id')
  async deleteComment(@Req() req: any, @Param('id') id: number): Promise<void> {
    const userId = req.session.userId;

    await this.postsService.deleteComment(userId, id);
  }

  @Delete('votes/:voteId')
  async deleteVote(@Req() req: any, @Param() params) {
    const userId = req.session.userId;

    return await this.postsService.deleteVote(params.voteId);
  }

  @Post(':id/votes/like')
  async likePost(@Req() req: any, @Param('id') id: number) {
    const userId = req.session.userId;

    return await this.postsService.likePost(userId, id);
  }

  @Post(':id/votes/dislike')
  async dislikePost(@Req() req: any, @Param('id') id: number) {
    const userId = req.session.userId;

    return await this.postsService.dislikePost(userId, id);
  }
}

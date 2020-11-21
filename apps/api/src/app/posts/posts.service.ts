import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDTO, CreateCommentDTO, CreatePostDTO, PostDTO } from '@trombonix/data-transfer-objects';
import { Repository, DeleteResult } from 'typeorm';
import { Comment } from './comment.entity';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>
  ) {}

  async getPost(id: number): Promise<PostDTO> {
    return await this.postsRepository.findOne(id);
  }

  async createPost(userId: number, createPostDTO: CreatePostDTO): Promise<PostDTO> {
    const post = this.postsRepository.create(createPostDTO);

    post.authorId = userId;

    return await this.postsRepository.save(post);
  }

  async deletePost(id: number): Promise<DeleteResult> {
    return await this.postsRepository.delete({ id });
  }

  async createComment(userId: number, postId: number, createCommentDTO: CreateCommentDTO): Promise<CommentDTO> {
    const comment = this.commentsRepository.create(createCommentDTO);
    const post = await this.postsRepository.findOne(postId);

    comment.post = post;
    comment.authorId = userId;

    return await this.commentsRepository.save(comment);
  }

  async deleteComment(id: number): Promise<DeleteResult> {
    return await this.commentsRepository.delete(id);
  }
}

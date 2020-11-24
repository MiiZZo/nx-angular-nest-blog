import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDTO, CreateCommentDTO, CreatePostDTO, PostDTO } from '@trombonix/data-transfer-objects';
import { Repository, DeleteResult } from 'typeorm';
import { Comment } from './comment.entity';
import { PostVote } from './post-vote.entity';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(PostVote)
    private readonly postVotesRepository: Repository<PostVote>
  ) { }

  async getPost(id: number): Promise<PostDTO> {
    return await this.postsRepository.findOne(id, { relations: ['comments', 'tags'] });
  }

  async createPost(userId: number, createPostDTO: CreatePostDTO): Promise<PostDTO> {
    const post = this.postsRepository.create({
      ...createPostDTO,
      comments: [],
    });

    post.authorId = userId;

    return await this.postsRepository.save(post);
  }

  async deletePost(userId: number, postId: number): Promise<DeleteResult> {
    const post = await this.postsRepository.findOne(postId);

    if (post.authorId !== userId) {
      throw new ForbiddenException('You are not the author of this post');
    }

    return await this.postsRepository.delete({ id: postId });
  }

  async createComment(userId: number, postId: number, createCommentDTO: CreateCommentDTO): Promise<CommentDTO> {
    const comment = this.commentsRepository.create(createCommentDTO);
    const post = await this.postsRepository.findOne(postId);

    comment.post = post;
    comment.authorId = userId;

    return await this.commentsRepository.save(comment);
  }

  async deleteComment(userId: number, id: number): Promise<DeleteResult> {
    const comment = await this.commentsRepository.findOne(id);

    if (comment.authorId !== userId) {
      throw new ForbiddenException('You are not the author of this comment');
    }

    return await this.commentsRepository.delete(id);
  }

  async likePost(userId: number, postId: number) {
    const postVote = await this.postVotesRepository.findOne({
      userId
    });

    if (postVote) {
      postVote.value = 1;

      return await this.postVotesRepository.save(postVote);
    }

    const createdPostVote = this.postVotesRepository.create({
      postId,
      userId,
      value: 1
    });

    return await this.postVotesRepository.save(createdPostVote);
  }

  async dislikePost(userId: number, postId: number) {
    const postVote = await this.postVotesRepository.findOne({
      userId
    });

    if (postVote) {
      postVote.value = -1;

      return await this.postVotesRepository.save(postVote);
    }

    const createdPostVote = await this.postVotesRepository.create({
      userId,
      postId,
      value: -1
    });

    return await this.postVotesRepository.save(createdPostVote);
  }

  async deleteVote(voteId: number) {
    return await this.postVotesRepository.delete(voteId);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDTO, PostDTO } from '@trombonix/data-transfer-objects';
import { Repository, DeleteResult } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>
  ) {}

  async getPost(id: number): Promise<PostDTO> {
    return await this.postsRepository.findOne(id);
  }

  async createPost(createPostDTO: CreatePostDTO): Promise<PostDTO> {
    const post = this.postsRepository.create(createPostDTO);

    return await this.postsRepository.save(post);
  }

  async deletePost(id: number): Promise<DeleteResult> {
    return await this.postsRepository.delete({ id });
  }
}

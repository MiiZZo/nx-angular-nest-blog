import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDTO } from './create-tag.dto';
import { Tag } from './tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>
  ) {}

  async getAll(): Promise<Tag[]> {
    return await this.tagsRepository.find();
  }

  async createOne(createTagDTO: CreateTagDTO): Promise<Tag> {
    const tag = this.tagsRepository.create(createTagDTO);

    return await this.tagsRepository.save(tag);
  }

  async deleteOne(tagId: number): Promise<void> {
    await this.tagsRepository.delete({ id: tagId });
  }
}

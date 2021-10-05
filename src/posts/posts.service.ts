import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    return this.postsRepository.save(createPostDto);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['user'] });
  }

  findOne(id: number): Promise<Post> {
    return this.postsRepository.findOne(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.postsRepository.update(id, updatePostDto);
    return this.postsRepository.findOne(id);
  }

  remove(id: number): Promise<Post> {
    const data = this.postsRepository.findOne(id);
    this.postsRepository.delete(id);
    return data;
  }
}

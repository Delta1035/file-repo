import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article, User } from 'src/blog/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}
}

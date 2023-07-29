import {
  FindManyOptions,
  Repository,
} from '.pnpm/typeorm@0.2.34/node_modules/typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../models/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private ArticleRepository: Repository<Article>,
  ) {
    console.log('ArticleService start');
  }

  async findAll(index: number, limit: number): Promise<[Article[], number]> {
    return await this.ArticleRepository.query(
      `where id > ${index} limit ${limit}`,
    );
  }

  async articleCount(): Promise<number> {
    return await this.ArticleRepository.count();
  }
}

import { Controller, Get, Param, Post } from '@nestjs/common';
import { ArticleService } from '../services/article.service';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}
  @Post('/allArticle')
  public async register(@Param() index: number, @Param() limit: number) {
    const article = this.articleService.findAll(index, limit);
    return article;
  }

  @Get('/articleCount')
  public async articleCount() {
    return this.articleService.articleCount();
  }
}

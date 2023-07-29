import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleController, UserController } from './controllers';
import { ArticleService, UserService } from './services';

@Module({
  imports: [],
  controllers: [AppController, ArticleController, UserController],
  providers: [AppService, ArticleService, UserService],
})
export class AppModule {}

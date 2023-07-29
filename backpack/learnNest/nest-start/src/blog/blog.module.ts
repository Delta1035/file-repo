import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AppController,
  LoginController,
  UserController,
  ArticleController,
  BannerController,
  CategoryController,
  CommentController,
  ReplyController,
  RoleController,
} from 'src/blog/controller';
import { User, Article } from 'src/blog/entities';
import {
  AppService,
  LoginService,
  UserService,
  ArticleService,
  RoleService,
  ReplyService,
  CommentService,
  BannerService,
  CategoryService,
} from 'src/blog/service';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '124.221.95.189',
      port: 3306,
      username: 'blog_dev',
      password: 'blog3363787543',
      database: 'blog_dev',
      entities: [User, Article],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User, Article]),
  ],
  controllers: [
    AppController,
    LoginController,
    UserController,
    ArticleController,
    BannerController,
    CategoryController,
    CommentController,
    ReplyController,
    RoleController,
    UserController,
  ],
  providers: [
    AppService,
    LoginService,
    UserService,
    ArticleService,
    RoleService,
    ReplyService,
    CommentService,
    BannerService,
    CategoryService,
  ],
})
export class BlogModule {
  constructor(private dataSource: DataSource) {}
}

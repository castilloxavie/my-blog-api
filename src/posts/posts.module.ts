import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from './entities/post.entity';
import { Category } from './entities/category.entity';
import { PostsController } from './controllers/posts.controller';
import { CategoryController } from './controllers/category.controller';
import { PostsService } from './services/posts.service';
import { CategoryService } from './services/category.service';


@Module({
  imports: [TypeOrmModule.forFeature([Post, Category])],
  controllers: [PostsController, CategoryController],
  providers: [PostsService, CategoryService],
  exports: [PostsService, CategoryService],
})

export class PostsModule {}



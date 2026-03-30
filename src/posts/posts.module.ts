import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AiModule } from '../ai/ai.module';
import { CategoryController } from './controllers/category.controller';
import { PostsController } from './controllers/posts.controller';
import { Category } from './entities/category.entity';
import { Post } from './entities/post.entity';
import { CategoryService } from './services/category.service';
import { PostsService } from './services/posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category]), AiModule],
  controllers: [PostsController, CategoryController],
  providers: [PostsService, CategoryService],
  exports: [PostsService, CategoryService],
})

export class PostsModule {}



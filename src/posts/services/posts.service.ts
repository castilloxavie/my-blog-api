import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Repository } from 'typeorm';

import { OpenaiService } from '../../ai/services/openai.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Category } from '../entities/category.entity';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private PostRepository: Repository<Post>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private readonly openaiService: OpenaiService
  ){}



  async findAll () {
   const posts = await this.PostRepository.find({
     relations: ["categories", "user.profile"]
   })
   return posts;
  }

  async getPostByid(id: number){
    const post = await this.findOne(id);
    return post
  }

async findByUserId(userId: number) {
    return await this.PostRepository.find({
      where: { user: { id: userId } },
      relations: ["user.profile"]
    });
  }

  async create(body: CreatePostDto, userId: number){
    try {
    const { categories: catIds, ...postData } = body;
      const postDataObj: DeepPartial<Post> = {
        ...postData,
        user: { id: userId }
      };

      if (catIds && catIds.length > 0) {
        const categories = await this.categoryRepository.find({
          where: { id: In(catIds as number[]) }
        });
        (postDataObj as any).categories = categories;
      }

      const post: Post = await this.PostRepository.create(postDataObj);
      await this.PostRepository.save(post);
      return this.findOne(post.id);

    } catch (error) {
      throw new BadRequestException("Error al crear el post");
    }
  }

  async update(id: number, change: UpdatePostDto){
    try {
      const post = await this.findOne(id);
      const { categories: catIds, ...changeData } = change;
      let changeObj: DeepPartial<Post> = { ...changeData };

      if (catIds && catIds.length > 0) {
        const categories = await this.categoryRepository.find({
          where: { id: In(catIds as number[]) }
        });
        (changeObj as any).categories = categories;
      }

      const updatePost = this.PostRepository.merge(post, changeObj);
      const result = await this.PostRepository.save(updatePost);
      return result;

    } catch (error) {
      throw new BadRequestException("Error al actualizar el post");
    }
  }

  async delete(id: number){
    try {
      const post = await this.findOne(id)
      await this.PostRepository.remove(post)
      return post;
    } catch  {
      throw new BadRequestException("Error al eliminar el post")
    }
  }

  private async findOne(id: number){
    const post = await this.PostRepository.findOne({
      where: {id},
      relations: ["user.profile"]
    })

    if(!post){
      throw new NotFoundException(` El post con el id ${id} no existe`)
    }
    return post;
  }

  async findPostsByCategoryId(categoryId: number) {
    return await this.PostRepository.find({
      where: { categories: { id: categoryId } },
      relations: ["user.profile", "categories"]
    });
  }

  async publish(id: number, userId: number) {
    try {

      const post = await this.findOne(id)
      if(post.user.id !== userId) {
        throw new ForbiddenException("No tienes permiso para publicar este post")
      }

      if(!post.content || !post.title || post.categories.length === 0) {
        throw new BadRequestException("El post no está completo y no se puede publicar. Asegúrate de que tenga título, contenido y al menos una categoría.")
      }

      const summary = await this.openaiService.generateSummary(post.content);
      const imageUrl = await this.openaiService.generateImage(summary);
      const changes = this.PostRepository.merge(post, {
        isDraft: false,
        sumary: summary,
        coverImage: imageUrl
      })

      const updatedPost = await this.PostRepository.save(changes);
      return this.findOne(updatedPost.id);

    } catch (error) {
      throw new BadRequestException("Error al publicar el post")
    }
  }

}




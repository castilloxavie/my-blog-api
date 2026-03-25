import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private PostRepository: Repository<Post>,
  ){}



  async findAll () {
   const posts = await this.PostRepository.find()
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

  async create(body: CreatePostDto){
    try {
      const post = await this.PostRepository.create({
        ...body,
        user: {id: body.userId}
      })
      await this.PostRepository.save(post)
      return  this.findOne(post.id);

    } catch (error) {
      throw new BadRequestException("Error al crear el post")
    }
  }

  async update(id: number, change: UpdatePostDto){
    try {
      const post = await this.findOne(id)
      const updatePost = this.PostRepository.merge(post, change)
      const result = await this.PostRepository.save(updatePost)
      return result;

    } catch (error) {
      throw new BadRequestException ("Error al actualizar el post")
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


}




import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import type { Request } from 'express';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostsService } from '../services/posts.service';
import { AuthGuard } from '@nestjs/passport';
import { Payload } from 'src/auth/models/payload.model';
import { Post as PostEntity } from '../entities/post.entity';

// @UseGuards(AuthGuard("jwt")) --> es para proteger todas las rutas, se coloca a nivel superior de los controller
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({summary: "Crea un nuevo post"})
  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const payload = req.user as Payload
    const userId = payload.sub
    return this.postsService.create(createPostDto, userId);
  }

  @ApiOperation({summary: "Obtiene todos los posts"})
  @ApiResponse({status: 200, description: "Posts obtenidos correctamente", type: PostEntity})
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({summary: "Obtiene un post por su ID"})
  @ApiResponse({status: 200, description: "Post obtenido correctamente"})
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostByid(id);
  }

  @ApiOperation({summary: "Actualiza un post por su ID"})
  @UseGuards(AuthGuard("jwt"))
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @ApiOperation({summary: "Publica un post por su ID"})
  @UseGuards(AuthGuard("jwt"))
  @Put(":id/publish")
  publish(@Param("id", ParseIntPipe) id: number, @Req() req: Request) {
    const payload = req.user as Payload;
    const userId = payload.sub;
    return this.postsService.publish(id, userId);
  }

  @ApiOperation({summary: "Elimina un post por su ID"})
  @UseGuards(AuthGuard("jwt"))
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}





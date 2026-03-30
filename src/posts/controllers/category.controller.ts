import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryService } from '../services/category.service';
import { PostsService } from '../services/posts.service';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly postsService: PostsService
  ) {}

  @ApiOperation({summary: "Crea una nueva categoría"})
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({summary: "Obtiene todos los posts de una categoría por su ID"})
  @ApiResponse({status: 200, description: "Posts obtenidos correctamente"})
  @Get(':id/posts')
  findPostsByCategoryId(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findPostsByCategoryId(id);
  }


  @ApiOperation({summary: "Obtiene todas las categorías"})
  @ApiResponse({status: 200, description: "Categorías obtenidas correctamente"})
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({summary: "Obtiene una categoría por su ID"})
  @ApiResponse({status: 200, description: "Categoría obtenida correctamente"})
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getCategoryById(id);
  }

  @ApiOperation({summary: "Actualiza una categoría por su ID"})
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiOperation({summary: "Elimina una categoría por su ID"})
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}


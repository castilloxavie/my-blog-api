import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ){}

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async getCategoryById(id: number) {
    const category = await this.findOne(id);
    return category;
  }

  async create(body: CreateCategoryDto) {
    try {
      const category = await this.categoryRepository.create(body);
      await this.categoryRepository.save(category);
      return this.findOne(category.id);
    } catch (error) {
      throw new BadRequestException("Error al crear la categoría");
    }
  }

  async update(id: number, change: UpdateCategoryDto) {
    try {
      const category = await this.findOne(id);
      const updatedCategory = this.categoryRepository.merge(category, change);
      const result = await this.categoryRepository.save(updatedCategory);
      return result;
    } catch (error) {
      throw new BadRequestException("Error al actualizar la categoría");
    }
  }

  async delete(id: number) {
    try {
      const category = await this.findOne(id);
      await this.categoryRepository.remove(category);
      return category;
    } catch (error) {
      throw new BadRequestException("Error al eliminar la categoría");
    }
  }

  private async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id }
    });

    if (!category) {
      throw new NotFoundException(`La categoría con el id ${id} no existe`);
    }
    return category;
  }
}


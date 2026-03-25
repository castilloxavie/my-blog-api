import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { createUserDto, updateUserDto } from './dtos/user.dto';
import { User } from './entitites/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ){}

  async findAll () {
   const user = await this.UserRepository.find()
   return user;

  }

  async getUserByid(id: number){
    const user = await this.findOne(id);
    return user
  }

  async create(body: createUserDto){
    try {
      const user = await this.UserRepository.create(body)
      await this.UserRepository.save(user)
      return user;

    } catch (error) {
      throw new BadRequestException("Error al crear el usuario")
    }


  }

  async update(id: number, change: updateUserDto){
    try {
      const user = await this.findOne(id)
      const updateUser = this.UserRepository.merge(user, change)
      const result = await this.UserRepository.save(updateUser)
      return result;

    } catch (error) {
      throw new BadRequestException ("Error al actualizar el usuario")
    }

  }

  async delete(id: number){
    try {
      const user = await this.findOne(id)
      await this.UserRepository.remove(user)
      return user;
    } catch  {
      throw new BadRequestException("Error al eliminar el usuario")
    }

  }

  async getProfileByUserId (id: number) {
    const user = await this.findOne(id)
    return user.profile;
  }

  private async findOne(id: number){
    const user = await this.UserRepository.findOne({
      where: {id},
      relations: ["profile"]
    })

    if(!user){
      throw new NotFoundException(`usuario no existe ${id}`)
    }
    return user;
  }

  }

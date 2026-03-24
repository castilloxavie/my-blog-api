import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entitites/user.entity';
import { createUserDto, updateUserDto } from './user.dto';

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
    if(user.id === 1){
      throw new ForbiddenException("este usuario no tiene permisos")
    }
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
    const user = await this.findOne(id)
    const updateUser = this.UserRepository.merge(user, change)
    await this.UserRepository.save(updateUser)
    return updateUser;
  }

  async delete(id: number){
    const user = await this.findOne(id)
    await this.UserRepository.remove(user)
    return user;
  }



  private async findOne(id: number){
    const user = await this.UserRepository.findOneBy({id})

    if(!user){
      throw new NotFoundException(`usuario no existe ${id}`)
    }
    return user;
  }

  }

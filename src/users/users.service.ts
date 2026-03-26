import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { createUserDto, updateUserDto } from './dtos/user.dto';
import { User } from './entitites/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll () {
   const user = await this.userRepository.find()
   return user;
  }

  async getUserByid(id: number){
    const user = await this.findOne(id);
    return user
  }

  async create(body: createUserDto){
    try {
      const user = await this.userRepository.create(body)
      const result = await this.userRepository.save(user)
      return this.findOne(result.id);
    } catch (error) {
      throw new BadRequestException(error.message || "Error al crear el usuario")
    }
  }

  async update(id: number, change: updateUserDto){
    try {
      const user = await this.findOne(id)
      const updateUser = this.userRepository.merge(user, change)
      const result = await this.userRepository.save(updateUser)
      return result;
    } catch (error) {
      throw new BadRequestException(error.message || "Error al actualizar el usuario")
    }
  }

  async delete(id: number){
    try {
      const user = await this.findOne(id)
      await this.userRepository.remove(user)
      return user;
    } catch (error) {
      throw new BadRequestException(error.message || "Error al eliminar el usuario")
    }
  }

  async getProfileByUserId (id: number) {
    const user = await this.findOne(id)
    return user.profile;
  }

  private async findOne(id: number){
    const user = await this.userRepository.findOne({
      where: {id},
      relations: ["profile"]
    })

    if(!user){
      throw new NotFoundException(`usuario no existe ${id}`)
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email}
    })
    return user;
  }

}

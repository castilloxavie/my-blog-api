import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { User } from './user.models';
import { createUserDto, updateUserDto } from './user.dto';

@Injectable()
export class UsersService {

  private users: User[] =[
      {
        id: '1',
        name: 'John Doe',
        email: 'john@doe.com',
      },
      {
        id: '2',
        name: 'Jane Doess',
        email: 'jane@doess.com',
      },
      {
        id: '3',
        name: 'Bob Smith',
        email: 'bob@smith.com',
      }
    ]

    findAll() {
      return this.users;
    }


    getUserByid(id: string) {
      const position = this.findOne(id);
      const user = this.users[position];

      if(user.id ==='1'){
        throw new ForbiddenException('No tienes permiso para acceder a este usuario.');
      }
      return user;
    }

    create(body: createUserDto) {
      const newUser: User = {
            ...body,
            id: `${new Date().getTime()}`,
          }
          this.users.push(newUser);
          return {
            message: 'Usuario creado exitosamente',
            user: newUser,
      }
    }

    update(id: string, user: updateUserDto){
      const position = this.findOne(id);
      const currentData = this.users[position];
      const updateUser = {
        ...currentData,
        ...user,
      }
      this.users[position] = updateUser;
      return updateUser;
    }

    delete(id: string){
      const position = this.findOne(id);
      this.users.splice(position, 1);
      return {
        message: 'Usuario eliminado exitosamente',
      }
    }

    private findOne(id: string) {
      const user = this.users.findIndex(user => user.id === id);

      if (user === -1){
        throw new NotFoundException(`Usuario con id ${id} no se encontró.`);
      }

      return user;
    }

  }

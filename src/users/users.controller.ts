import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { createUserDto, updateUserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private useService: UsersService){}

  @ApiOperation({summary: "Obtiene todos los usuarios"})
  @ApiResponse({status: 200, description: "Usuarios obtenidos correctamente"})
  @Get()
  getUsers(){
    return this.useService.findAll();
  }

  @ApiOperation({summary: "Obtiene un usuario por su ID"})
  @ApiResponse({status: 200, description: "Usuario obtenido correctamente"})
  @Get(':id')
  findUser(@Param('id', ParseIntPipe) id: number){
    return this.useService.getUserByid(id);
  }

  @ApiOperation({summary: "Obtiene el perfil de un usuario por su ID"})
  @ApiResponse({status: 200, description: "Perfil obtenido correctamente"})
  @Get(':id/profile')
  getProfile(@Param('id', ParseIntPipe) id: number){
    return this.useService.getProfileByUserId(id);
  }

  @ApiOperation({summary: "Obtiene un usuario por su email"})
  @ApiResponse({status: 200, description: "Usuario obtenido correctamente"})
  @Get(':id/posts')
  getPosts(@Param('id', ParseIntPipe) id: number){
    return this.useService.getUserByid(id);
  }

  @ApiOperation({summary: "Crea un nuevo usuario"})
  @Post()
  createUser(@Body() body: createUserDto){
    return this.useService.create(body);
  }

  @ApiOperation({summary: "Elimina un usuario por su ID"})
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number){
    return this.useService.delete(id);
  }

  @ApiOperation({summary: "Actualiza un usuario por su ID"})
  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: updateUserDto){
    return this.useService.update(id, body);
  }
}

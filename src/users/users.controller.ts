import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';

import { createUserDto, updateUserDto } from './user.dto';
import { UsersService } from './users.service';




@Controller('users')
export class UsersController {
  constructor(private useService: UsersService){}


  @Get()
  getUsers(){
    return this.useService.findAll();
  }


  @Get(':id')
  findUser(@Param('id', ParseIntPipe) id: number){
    return this.useService.getUserByid(id);
  }

  @Post()
  createUser(@Body() body: createUserDto){
    return this.useService.create(body);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number){
    return this.useService.delete(id);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: updateUserDto){
    return this.useService.update(id, body);
  }
}

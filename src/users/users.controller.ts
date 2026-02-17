import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';

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
  findUser(@Param('id') id: string){
    return this.useService.getUserByid(id);
  }

  @Post()
  createUser(@Body() body: createUserDto){
    return this.useService.create(body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string){
    return this.useService.delete(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: updateUserDto){
    return this.useService.update(id, body);
  }
}

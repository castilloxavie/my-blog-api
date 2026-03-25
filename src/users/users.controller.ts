import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

import { PostsService } from '../posts/services/posts.service';
import { createUserDto, updateUserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private useService: UsersService, private readonly postsService: PostsService){}


  @Get()
  getUsers(){
    return this.useService.findAll();
  }


  @Get(':id')
  findUser(@Param('id', ParseIntPipe) id: number){
    return this.useService.getUserByid(id);
  }

  @Get(':id/profile')
  getProfile(@Param('id', ParseIntPipe) id: number){
    return this.useService.getProfileByUserId(id);
  }

  @Get(':id/posts')
  getPosts(@Param('id', ParseIntPipe) id: number){
    return this.postsService.findByUserId(id);
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

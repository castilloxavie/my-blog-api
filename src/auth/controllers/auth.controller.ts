import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { User } from '../../users/entitites/user.entity';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({summary: "Inicia sesión"})
  @ApiResponse({status: 200, description: "Inicio de sesión exitoso"})
  @UseGuards(AuthGuard("local"))
  @Post("login")
  login(@Req() req: Request){
    const user = req.user as User
    return {
      user,
      access_token: this.authService.generateToken(user)
    }
  }

}

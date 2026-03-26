import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import * as bcrypt from "bcrypt";
import { User } from '../../users/entitites/user.entity';



@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);

    if(!user){
      throw new UnauthorizedException("No autorizado")
    }

    const isMatch = await bcrypt.compare(password, user.password);


    if(!isMatch){
      throw new UnauthorizedException("No autorizado")
    }

    return user
  }

  generateToken(user: User) {
    const payload = {sub: user.id}
    return this.jwtService.sign(payload)
  }
}

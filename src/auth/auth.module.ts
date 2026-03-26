import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { config } from "dotenv";
import { ConfigService } from '@nestjs/config';
import { EnvVars } from '../env.model';


config()

@Module({
  imports: [UsersModule, PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvVars>) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: {expiresIn: "9h"}
      })
    })

    /*JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "9h"}
    })
    */
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}

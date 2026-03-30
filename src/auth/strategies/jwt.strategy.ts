import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Payload } from '../models/payload.model';
import { EnvVars } from './../../env.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    configService: ConfigService<EnvVars>,
  ) {

    const secret = configService.get("JWT_SECRET", {infer: true})

    if(!secret){
      throw new Error("Acceso denegado")
    }


    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret
    });
  }

  validate(payload: Payload) {
    return payload;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    console.log('JWT STRATEGY', configService.get<string>('jwt.accessSecret'));

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.accessSecret'),
    });
  }

  //TODO => debería de hacer un type para el payload
  async validate(payload: any) {
    //* NO llega el payload
    if (!payload.id) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}

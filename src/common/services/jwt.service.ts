import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';

interface IUserPayload {
  sub: number;
  email: string;
}
@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly configService: ConfigService,
  ) {}

  generateToken(user: any, secret: string, expiresIn = '7d'): Promise<string> {
    const { email, id } = user;
    return this.jwtService.signAsync(
      { email, id },
      {
        secret,
        expiresIn,
      },
    );
  }
  async generateAccessToken(payload: IUserPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.accessSecret'), // Acceso desde config
      expiresIn: this.configService.get<string>('jwt.accessTokenExpiration'),
    });
  }

  async generateRefreshToken(payload: IUserPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.refreshSecret'), // Secreto para refresh token
      expiresIn: this.configService.get<string>('jwt.refreshTokenExpiration'),
    });
  }

  verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
}

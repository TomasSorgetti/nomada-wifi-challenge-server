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

  //TODO => Tal vez conviene crear un único metodo para la creacion de access y refresh tokens

  /**
   * Servicio para generar un access token
   * @param payload
   * @returns
   */
  async generateAccessToken(payload: IUserPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.accessSecret'),
      expiresIn: this.configService.get<string>('jwt.accessTokenExpiration'),
    });
  }

  /**
   * Servicio para generar un refresh token
   * @param payload
   * @returns
   */
  async generateRefreshToken(payload: IUserPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.refreshSecret'),
      expiresIn: this.configService.get<string>('jwt.refreshTokenExpiration'),
    });
  }

  /**
   * Servicio para verificar un token
   * @param token
   * @returns
   */
  verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }

  /**
   * Servicio para decodificar un token
   * @param token
   * @returns
   */
  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }

  getExpiresIn() {
    return this.configService.get<string>('jwt.accessTokenExpiration');
  }
}

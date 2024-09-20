import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PasswordService } from 'src/common/services/password.service';
import { UsersService } from '../users/users.service';
import { JwtService } from 'src/common/services/jwt.service';
import { SensitiveUserService } from 'src/common/services/sensitiveUser.service';
import { Response } from 'express';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { ILoginResponse } from './interfaces/login.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly sensitiveUserService: SensitiveUserService,
  ) {}

  /**
   * Servicio para iniciar sesion
   * @param email
   * @param password
   * @returns
   */
  async login(email: string, password: string): Promise<ILoginResponse> {
    const foundUser = await this.userService.getUserByEmail(email);

    if (foundUser?.deletedAt !== null) {
      throw new BadRequestException('User was deleted');
    }
    if (!foundUser) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      foundUser.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      email: foundUser.email,
      sub: foundUser.id,
    };
    const accessToken = await this.jwtService.generateAccessToken(payload);
    const refreshToken = await this.jwtService.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      expiresIn: this.jwtService.getExpiresIn(),
      user: this.sensitiveUserService.getUserWithoutSensitiveData(foundUser),
    };
  }

  /**
   * Servicio para registrar un usuario
   * @param email
   * @param password
   * @returns
   */
  async register(email: string, password: string) {
    const foundUser = await this.userService.getUserByEmail(email);
    if (foundUser || foundUser?.deletedAt !== null) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await this.passwordService.hashPassword(password);

    const user = await this.userService.createUser(email, hashedPassword);
    return this.sensitiveUserService.getUserWithoutSensitiveData(user);
  }

  /**
   * Servicio para cerrar sesion
   * @param res
   * @returns
   */
  async logout(res: Response): Promise<{ message: string }> {
    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(0),
    });
    return { message: 'Logout successful' };
  }

  /**
   * Servicio para refrescar el refreshToken
   * @param user
   * @param res
   * @returns
   */
  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    const { sub: userId, email } = this.jwtService.decodeToken(
      refreshTokenDto.refreshToken,
    );
    const accessToken = await this.jwtService.generateAccessToken({
      sub: userId,
      email,
    });
    const refreshToken = await this.jwtService.generateRefreshToken({
      sub: userId,
      email,
    });

    return {
      accessToken,
      expiresIn: this.jwtService.getExpiresIn(),
      refreshToken,
    };
  }

  /**
   * Servicio para obtener el usuario cuando está autenticado
   * @param user
   * @returns
   */
  async me(user: { id: number }) {
    //* Buscar por id es más rápido que buscar por email
    const foundUser = await this.userService.getUserByPk(user.id);
    if (!foundUser) {
      throw new BadRequestException('User not found');
    }
    return this.sensitiveUserService.getUserWithoutSensitiveData(foundUser);
  }
}

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
  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: any }> {
    //* Find user
    const foundUser = await this.userService.getUserByEmail(email);
    if (!foundUser) {
      throw new BadRequestException('User not found');
    }
    //* Compare password
    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      foundUser.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    //* Generate tokens
    const payload = {
      email: foundUser.email,
      sub: foundUser.id,
    };
    const accessToken = await this.jwtService.generateAccessToken(payload);
    const refreshToken = await this.jwtService.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
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
    if (foundUser) {
      throw new BadRequestException('This email already exists');
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
  async refreshTokens(user: any, res: Response) {
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.generateAccessToken(payload);
    const refreshToken = await this.jwtService.generateRefreshToken(payload);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      //* secure en produccion es true, se debería de cambiar desde el process.env.NODE_ENV === 'production'
      secure: false,
      //* sameSite en produccion debería ser strict dependiendo del dominio
      sameSite: 'lax',
    });

    return { accessToken };
  }

  /**
   * Servicio para obtener el usuario cuando está autenticado
   * @param user
   * @returns
   */
  async me(user: { id: number }) {
    //* Buscar por id es más rápido que buscar por email
    const foundUser = await this.userService.getUserByPk(user.id);
    return this.sensitiveUserService.getUserWithoutSensitiveData(foundUser);
  }
}

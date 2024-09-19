import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Response, Request } from 'express';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Controlador para iniciar sesion
   * @param newUser
   * @param res
   * @returns
   */
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(
      loginUserDto.email,
      loginUserDto.password,
    );
    //TODO=> la idea era mandar el refresh como httpOnly
    // res.cookie('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: 'lax',
    // });
  }

  /**
   * Controlador para registrar un usuario
   * @param newUser
   * @returns
   */
  @Post('register')
  register(@Body() newUser: RegisterUserDto) {
    return this.authService.register(newUser.email, newUser.password);
  }

  /**
   * Controlador para cerrar sesion
   * @param res
   * @returns
   */
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res);
  }

  /**
   * Controlador para refrescar el refreshToken
   * @param refreshTokenDto
   * @param req
   * @param res
   * @returns
   */
  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshTokens(refreshTokenDto);
  }

  //TODO => Guard no funciona, revisar
  /**
   * Cotrolador para obtener los datos del usuario cuando esta autenticado
   * @param req
   * @returns
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(
    @Req()
    req,
  ) {
    return this.authService.me(req.user);
  }
}

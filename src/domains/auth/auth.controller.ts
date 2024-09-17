import {
  Body,
  Controller,
  Get,
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

  @Post('login')
  login(
    @Body() newUser: LoginUserDto,
    @Res()
    res: Response,
  ) {
    return this.authService.login(newUser.email, newUser.password, res);
  }

  @Post('register')
  register(@Body() newUser: RegisterUserDto) {
    return this.authService.register(newUser.email, newUser.password);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard) 
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res);
  }

  @Post('refresh')
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refreshTokens(req.cookies.refreshToken, res);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(
    @Req()
    req,
  ) {
    return this.authService.me(req.user);
  }
}

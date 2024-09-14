import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from '../users/dto/users.create.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() newUser: UserDto) {
    return this.authService.login(newUser.email, newUser.password);
  }

  @Post('register')
  register(@Body() newUser: CreateUserDto) {
    return this.authService.register(newUser.email, newUser.password);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  @Post('refresh')
  refresh() {
    return this.authService.refresh();
  }

  @Get('me')
  me() {
    return this.authService.me();
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() newUser: UserDto) {
    return this.authService.login(newUser.email, newUser.password);
  }

  @Post('register')
  register() {
    return this.authService.register();
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

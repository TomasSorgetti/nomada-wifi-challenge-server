import {
  Body,
  Controller,
  Delete,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //TODO=> protected route
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deletUser(@Request() req, @Body() { password }: { password: string }) {
    return this.usersService.deletUser(req.user.sub, password);
  }
}

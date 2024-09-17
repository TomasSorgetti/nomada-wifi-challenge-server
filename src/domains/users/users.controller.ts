import {
  Body,
  Controller,
  Delete,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Delete('')
  //TODO debería de usar un guard?
  async deletUser(@Body() email: string, password: string) {
    return this.usersService.deletUser(email, password);
  }
}

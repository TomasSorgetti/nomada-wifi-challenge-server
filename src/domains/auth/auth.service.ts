import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity';
import { Repository } from 'typeorm';
import { PasswordService } from 'src/common/services/password.service';
import { Role } from '../roles/entities/roles.entity';
import { CreateUserDto } from '../users/dto/users.create.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  async login(email: string, password: string) {
    const foundUser = await this.userService.getUserByEmail(email);
    if (!foundUser) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      foundUser.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }
    
  }
  async register(email: string, password: string) {
    const foundUser = await this.userService.getUserByEmail(email);
    if (foundUser) {
      throw new BadRequestException('This email already exists');
    }
    const hashedPassword = await this.passwordService.hashPassword(password);

    return await this.userService.createUser(email, hashedPassword);
  }
  async logout() {
    return 'NOT_IMPLEMENTED';
  }
  async refresh() {
    return 'NOT_IMPLEMENTED';
  }
  me() {
    return 'NOT_IMPLEMENTED';
  }
}

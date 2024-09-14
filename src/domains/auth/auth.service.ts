import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity';
import { Repository } from 'typeorm';
import { PasswordService } from 'src/common/services/password.service';
import { Role } from '../roles/entities/roles.entity';
import { CreateUserDto } from '../users/dto/users.create.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    private readonly passwordService: PasswordService,
  ) {}

  async login(email: string, password: string) {
    return email;
  }
  async register(email: string, password: string) {
    const foundUser = await this.usersRepository.findOne({ where: { email } });
    if (foundUser) {
      throw new BadRequestException('This email already exists');
    }
    const role = await this.rolesRepository.findOne({
      where: { name: 'user' },
    });
    if (!role) {
      throw new BadRequestException('Role not found');
    }
    const hashedPassword = await this.passwordService.hashPassword(password);
    const user = await this.usersRepository.save({
      email: email,
      password: hashedPassword,
      roles: role,
    });
    return user;
  }
  async logout() {
    return 'logout';
  }
  async refresh() {
    return 'refresh';
  }
  me() {
    return 'me';
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.create.dto';
import { RolesService } from '../roles/roles.service';
import { PasswordService } from 'src/common/services/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly passwordService: PasswordService,
  ) {}
  getUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email, deletedAt: null } });
  }
  getUserByPk(id: number) {
    return this.usersRepository.findOne({ where: { id, deletedAt: null } });
  }
  getUsers() {
    return 'NOT_IMPLEMENTED';
  }
  async createUser(email: string, hashedPassword: string) {
    const role = await this.rolesService.findRoleByName('user');
    if (!role) {
      throw new BadRequestException('Role not found');
    }

    return await this.usersRepository.save({
      email,
      password: hashedPassword,
      roles: role,
    });
  }

  async deletUser(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const verifyPassword = await this.passwordService.comparePassword(
      password,
      user.password,
    );
    if (!verifyPassword) {
      throw new BadRequestException('Invalid password');
    }
    return await this.usersRepository.softRemove(user);
  }
}

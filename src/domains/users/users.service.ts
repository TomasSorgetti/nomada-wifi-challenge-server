import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';
import { PasswordService } from 'src/common/services/password.service';
import { IJwtUser } from '../auth/interfaces/jwtResponse.interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly passwordService: PasswordService,
  ) {}

  /**
   * Servicio para obterner un usuario por email
   * @param email
   * @returns
   */
  getUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      withDeleted: true,
    });
  }

  /**
   * Servicio para obtener un usuario por id
   * @param id
   * @returns
   */
  getUserByPk(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  /**
   * Servicio para obtener todos los usuarios NO IMPLEMENTADO
   * @returns
   */
  getUsers() {
    return 'NOT_IMPLEMENTED';
  }

  /**
   * Servicio para registrar un usuario
   * @param email
   * @param hashedPassword
   * @returns
   */
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

  /**
   * Elimina de manera Soft a un usuario
   * @param email
   * @param password
   * @returns
   */
  async deletUser(sub: number, password: string) {
    const userFound = await this.getUserByPk(sub);

    if (userFound.deletedAt !== null) {
      throw new BadRequestException('User already deleted');
    }

    if (!userFound) {
      throw new BadRequestException('User not found');
    }
    const verifyPassword = await this.passwordService.comparePassword(
      password,
      userFound.password,
    );
    if (!verifyPassword) {
      throw new BadRequestException('Invalid password');
    }
    userFound.deletedAt = new Date();
    await this.usersRepository.save(userFound);

    return {
      message: 'User deleted successfully',
    };
  }
}

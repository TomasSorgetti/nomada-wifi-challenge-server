import { Injectable, OnModuleInit } from '@nestjs/common';
import { Role } from './entities/roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleDto } from './dto/roles.dto';

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  //* OnModuleInit
  async onModuleInit() {
    await this.createDefaultRoles();
  }
  async createDefaultRoles() {
    const roles = ['admin', 'user'];

    for (const roleName of roles) {
      const roleExists = await this.rolesRepository.findOne({
        where: { name: roleName },
      });

      if (!roleExists) {
        const role = this.rolesRepository.create({ name: roleName });
        await this.rolesRepository.save(role);
        console.log(`Role ${roleName} creado`);
      }
    }
  }

  //* Methods
  async createRole(RoleDto: RoleDto) {
    return await this.rolesRepository.save(RoleDto);
  }
  async getAllRoles() {
    return await this.rolesRepository.find();
  }
  async findRoleByName(roleName: string) {
    return await this.rolesRepository.findOne({ where: { name: roleName } });
  }
  updateRole() {
    return 'NOT_IMPLEMENTED';
  }
  deleteRole() {
    return 'NOT_IMPLEMENTED';
  }
}

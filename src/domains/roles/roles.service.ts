import { Injectable } from '@nestjs/common';
import { Role } from './entities/roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleDto } from './dto/roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}
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

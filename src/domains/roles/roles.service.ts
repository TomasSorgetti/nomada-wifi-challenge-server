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

  /**
   * Funcion para crear roles por defecto al iniciar el servidor, en caso de que no existan
   */
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
  /**
   * Servicio para crear un rol
   * @param RoleDto
   * @returns
   */
  async createRole(RoleDto: RoleDto) {
    return await this.rolesRepository.save(RoleDto);
  }

  /**
   * Servicio para encontrar todos los roles
   * @returns
   */
  async getAllRoles() {
    return await this.rolesRepository.find();
  }

  /**
   * Servicio para encontrar un rol por su nombre
   * @param roleName
   * @returns
   */
  async findRoleByName(roleName: string) {
    return await this.rolesRepository.findOne({ where: { name: roleName } });
  }

  /**
   * Servicio para actualizar un rol - NO IMPLEMENTADO
   * @returns
   */
  updateRole(id: number) {
    return 'NOT_IMPLEMENTED';
  }

  /**
   * Servicio para eliminar un rol - NO IMPLEMENTADO
   * @returns
   */
  deleteRole(id: number) {
    return 'NOT_IMPLEMENTED';
  }
}

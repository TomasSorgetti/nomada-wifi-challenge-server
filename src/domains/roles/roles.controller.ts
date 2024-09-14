import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/roles.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole(@Body() RoleDto: RoleDto) {
    return this.rolesService.createRole(RoleDto);
  }

  @Get()
  getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @Get(':id')
  getRoleById() {
    return this.rolesService.getRoleById();
  }

  @Patch()
  updateRole() {
    return this.rolesService.updateRole();
  }

  deleteRole() {
    return this.rolesService.deleteRole();
  }
}

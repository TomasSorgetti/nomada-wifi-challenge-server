import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/roles.dto';

//TODO => Protected Routes
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

  @Patch('id')
  updateRole(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.updateRole(id);
  }

  @Delete('id')
  deleteRole(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.deleteRole(id);
  }
}

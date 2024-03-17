import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { CreateRoleDto } from './models/dto/request/create-role.dto';
import { RoleResponseDto } from './models/dto/response/role.response.dto';
import { RoleService } from './services/role.service';

@SkipAuth()
@ApiTags('Role')
@Controller('roles')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Post()
  public async createRole(
    @Body() dto: CreateRoleDto,
  ): Promise<RoleResponseDto> {
    return await this.rolesService.createRole(dto);
  }

  @Get(':value')
  public async getRoleByValue(
    @Param('value') value: string,
  ): Promise<RoleResponseDto> {
    return await this.rolesService.getRoleByValue(value);
  }
}

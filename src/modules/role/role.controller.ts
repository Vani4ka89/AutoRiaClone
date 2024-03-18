import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AddRoleRequestDto } from '../user/models/dto/request/add-role.request.dto';
import { Roles } from './decorators/roles.decorator';
import { ERoleAll } from './enums/roles.enum';
import { RolesGuard } from './guards/roles.guard';
import { CreateRoleDto } from './models/dto/request/create-role.dto';
import { RoleResponseDto } from './models/dto/response/role.response.dto';
import { RoleService } from './services/role.service';

@ApiTags('Role')
@Controller('roles')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create role (can only admin)' })
  @Roles(ERoleAll.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  public async createRole(
    @Body() dto: CreateRoleDto,
  ): Promise<RoleResponseDto> {
    return await this.rolesService.createRole(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get role (can only admin)' })
  @Roles(ERoleAll.ADMIN)
  @UseGuards(RolesGuard)
  @Get(':value')
  public async getRoleByValue(
    @Param('value') value: string,
  ): Promise<RoleResponseDto> {
    return await this.rolesService.getRoleByValue(value);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change role (can only admin)' })
  @ApiResponse({ status: 200 })
  @Roles(ERoleAll.ADMIN)
  @UseGuards(RolesGuard)
  @Post('change')
  public async addRole(
    @Body() dto: AddRoleRequestDto,
  ): Promise<RoleResponseDto> {
    return await this.rolesService.changeRole(dto);
  }
}

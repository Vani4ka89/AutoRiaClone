import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { RoleRepository } from '../../repository/services/role.repository';
import { CreateRoleDto } from '../models/dto/request/create-role.dto';
import { RoleResponseDto } from '../models/dto/response/role.response.dto';
import { RoleMapper } from './role.mapper';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  public async createRole(dto: CreateRoleDto): Promise<RoleResponseDto> {
    if (Number(dto.value)) {
      throw new BadRequestException('Value must be string only');
    }
    const entity = await this.roleRepository.findOneBy({ value: dto.value });
    if (!entity) {
      throw new ConflictException('Role has already exist');
    }
    const role = await this.roleRepository.save(
      this.roleRepository.create(dto),
    );
    return RoleMapper.toResponseDto(role);
  }

  public async getRoleByValue(value: string): Promise<RoleResponseDto> {
    if (Number(value)) {
      throw new BadRequestException('Value must be string only');
    }
    const role = await this.roleRepository.findOneBy({ value });
    if (!role) throw new NotFoundException('Role does not exist');
    return RoleMapper.toResponseDto(role);
  }
}

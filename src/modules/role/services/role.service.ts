import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { RoleRepository } from '../../repository/services/role.repository';
import { AddRoleRequestDto } from '../../user/models/dto/request/add-role.request.dto';
import { UserService } from '../../user/services/user.service';
import { CreateRoleDto } from '../models/dto/request/create-role.dto';
import { RoleResponseDto } from '../models/dto/response/role.response.dto';
import { RoleMapper } from './role.mapper';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly userService: UserService,
  ) {}

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

  public async changeRole(dto: AddRoleRequestDto): Promise<RoleResponseDto> {
    const user = await this.userService.findByIdOrThrow(dto.userId);
    const role = await this.roleRepository.findOneBy({ id: user.role_id });
    if (!user && !role) {
      throw new NotFoundException('User or role not found');
    }
    role.value = dto.value;
    const updatedRole = await this.roleRepository.save(role);
    return RoleMapper.toResponseDto(updatedRole);
  }
}

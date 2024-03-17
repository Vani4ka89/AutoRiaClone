import process from 'node:process';

import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../../../database/entities/user.entity';
import { ERole } from '../../auth/enums/roles.enum';
import { IUserData } from '../../auth/types/user-data.type';
import { RoleRepository } from '../../repository/services/role.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { RoleService } from '../../role/services/role.service';
import { AddRoleRequestDto } from '../models/dto/request/add-role.request.dto';
import { BanUserRequestDto } from '../models/dto/request/ban-user.request.dto';
import { CreateUserRequestDto } from '../models/dto/request/create-user.request.dto';
import { UpdateUserRequestDto } from '../models/dto/request/update-user.request.dto';
import { UserResponseDto } from '../models/dto/response/user.response.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly roleService: RoleService,
  ) {}

  public async createUser(dto: CreateUserRequestDto): Promise<UserResponseDto> {
    await this.isEmailUniqueOrThrow(dto.email);
    const password = await bcrypt.hash(dto.password, +process.env.SECRET_SALT);
    const role = await this.roleService.getRoleByValue(ERole.SELLER);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password, role }),
    );
    return UserMapper.toResponseDto(user);
  }

  public async getMyProfile(userData: IUserData): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOneBy({ id: userData.userId });
    return UserMapper.toResponseDto(entity);
  }

  public async updateMyProfile(
    useData: IUserData,
    dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOneBy({ id: useData.userId });
    await this.userRepository.save(this.userRepository.merge(entity, dto));
    return UserMapper.toResponseDto(entity);
  }

  public async getProfileById(userId: string): Promise<UserEntity> {
    await this.findByIdOrThrow(userId);
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: { role: true },
    });
    // return UserMapper.toResponseDto(entity);
  }

  public async deleteProfile(userId: string): Promise<void> {
    const user = await this.findByIdOrThrow(userId);
    await this.userRepository.remove(user);
  }

  public async isEmailUniqueOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('This user already exist');
    }
  }

  public async findByIdOrThrow(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        // },
        // relations: {
        //   roles: true,
      },
    });
    if (!user) {
      throw new UnprocessableEntityException();
    }
    return user;
  }
  ////////////////////////////////////////////////////////////////

  // public async addRole(dto: AddRoleRequestDto): Promise<UserEntity> {
  //   const user = await this.userRepository.findOneBy({ id: dto.userId });
  //   const role = await this.roleService.getRoleByValue(dto.value);
  //   if (role && user) {
  //     user.role.value = dto.value;
  //     return await this.userRepository.save(user);
  //   }
  //   throw new UnprocessableEntityException('User or role not found');
  // }

  public async addRole(dto: AddRoleRequestDto): Promise<UserResponseDto> {
    const role = await this.roleRepository.findOneBy({ value: dto.value });
    if (role) {
      throw new NotFoundException('Role not found');
    }
    const user = await this.userRepository.save(
      this.userRepository.create({ role }),
    );
    return UserMapper.toResponseDto(user);
  }

  public async banUser(dto: BanUserRequestDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
    });
    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }
    user.banned = true;
    user.banReason = dto.banReason;
    return await this.userRepository.save(user);
  }
}

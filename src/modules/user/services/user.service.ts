import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../../../database/entities/user.entity';
import { AuthCacheService } from '../../auth/services/auth-cache.service';
import { IUserData } from '../../auth/types/user-data.type';
import { AccountTypeRepository } from '../../repository/services/account-type.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { RoleRepository } from '../../repository/services/role.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { AddRoleRequestDto } from '../models/dto/request/add-role.request.dto';
import { BanUserRequestDto } from '../models/dto/request/ban-user.request.dto';
import { CreateUserRequestDto } from '../models/dto/request/create-user.request.dto';
import { UpdateUserRequestDto } from '../models/dto/request/update-user.request.dto';
import { UserResponseDto } from '../models/dto/response/user.response.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    private readonly authCacheService: AuthCacheService,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly accountTypeRepository: AccountTypeRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async createUser(dto: CreateUserRequestDto): Promise<UserResponseDto> {
    await this.isEmailUniqueOrThrow(dto.email);
    const password = await bcrypt.hash(dto.password, 10);
    const role = await this.roleRepository.save(
      this.roleRepository.create({ value: dto.role }),
    );
    const accountType = await this.accountTypeRepository.save(
      this.accountTypeRepository.create({ value: dto.accountType }),
    );
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password, role, accountType }),
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
    const entity = await this.findByIdOrThrow(useData.userId);
    const user = await this.userRepository.save(
      this.userRepository.merge({ ...entity, ...dto }),
    );
    return UserMapper.toResponseDto(user);
  }

  public async deleteMyProfile(useData: IUserData): Promise<void> {
    const user = await this.findByIdOrThrow(useData.userId);
    await Promise.all([
      this.refreshTokenRepository.delete({ user_id: useData.userId }),
      this.authCacheService.removeToken(useData.userId),
      this.userRepository.remove(user),
    ]);
  }

  public async getProfileById(userId: string): Promise<UserResponseDto> {
    const user = await this.findByIdOrThrow(userId);
    return UserMapper.toResponseDto(user);
  }

  public async deleteProfile(userId: string): Promise<void> {
    const user = await this.findByIdOrThrow(userId);
    await Promise.all([
      this.refreshTokenRepository.delete({ user_id: userId }),
      this.authCacheService.removeToken(userId),
      this.userRepository.remove(user),
    ]);
  }

  public async isEmailUniqueOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('This user already exist');
    }
  }

  public async findByIdOrThrow(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }
    return user;
  }

  //////////////////////////// GIVE A ROLE //////////////////////////////////

  public async addRole(dto: AddRoleRequestDto): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOneBy({ id: dto.userId });
    const role = await this.roleRepository.findOneBy({ id: entity.role_id });
    if (!entity && !role) {
      throw new NotFoundException('User or role not found');
    }
    role.value = dto.value;
    const user = await this.userRepository.save({ role });
    return UserMapper.toResponseDto(user);
  }

  //////////////////////// BAN A USER AND UNBAN ////////////////////////

  public async banUser(dto: BanUserRequestDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id: dto.userId });
    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }
    if (user.banned === true) {
      throw new ConflictException('User has already banned');
    }
    user.banned = true;
    user.banReason = dto.banReason;
    const userEntity = await this.userRepository.save(user);
    return UserMapper.toResponseDto(userEntity);
  }

  public async unbanUser(dto: BanUserRequestDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id: dto.userId });
    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }
    if (user.banned === false) {
      throw new ConflictException('User not banned');
    }
    user.banned = false;
    user.banReason = dto.banReason;
    const userEntity = await this.userRepository.save(user);
    return UserMapper.toResponseDto(userEntity);
  }
}

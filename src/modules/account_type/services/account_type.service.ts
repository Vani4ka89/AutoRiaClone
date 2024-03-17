import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { IUserData } from '../../auth/types/user-data.type';
import { AccountTypeRepository } from '../../repository/services/account-type.repository';
import { UserService } from '../../user/services/user.service';
import { CreateAccountTypeRequestDto } from '../models/dto/request/create-account-type.request.dto';
import { AccountTypeResponseDto } from '../models/dto/response/account-type.response.dto';
import { AccountTypeMapper } from './account-type.mapper';

@Injectable()
export class AccountTypeService {
  constructor(
    private readonly userService: UserService,
    private readonly accountTypeRepository: AccountTypeRepository,
  ) {}

  public async createType(
    dto: CreateAccountTypeRequestDto,
    userData: IUserData,
  ): Promise<AccountTypeResponseDto> {
    const user = await this.userService.getProfileById(userData.userId);
    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }
    const accountType = await this.accountTypeRepository.save(
      this.accountTypeRepository.create({ ...dto }),
    );
    return AccountTypeMapper.toResponseDto(accountType);
  }

  public async findById(
    typeId: string,
    userData: IUserData,
  ): Promise<AccountTypeResponseDto> {
    const user = await this.userService.getProfileById(userData.userId);
    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }
    const accountType = await this.accountTypeRepository.findOne({
      where: { id: typeId },
    });
    return AccountTypeMapper.toResponseDto(accountType);
  }
}

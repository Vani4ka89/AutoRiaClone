import { Injectable, NotFoundException } from '@nestjs/common';

import { AccountTypeEntity } from '../../../database/entities/account-type.entity';
import { AccountTypeRepository } from '../../repository/services/account-type.repository';
import { UserService } from '../../user/services/user.service';
import { UpdateAccountTypeRequestDto } from '../models/dto/request/update-account-type.request.dto';
import { AccountTypeResponseDto } from '../models/dto/response/account-type.response.dto';
import { AccountTypeMapper } from './account-type.mapper';

@Injectable()
export class AccountTypeService {
  constructor(
    private readonly userService: UserService,
    private readonly accountTypeRepository: AccountTypeRepository,
  ) {}

  public async findTypeByValue(value: string): Promise<AccountTypeEntity[]> {
    return await this.accountTypeRepository.find({
      where: { value },
    });
  }

  public async changeAccountType(
    dto: UpdateAccountTypeRequestDto,
  ): Promise<AccountTypeResponseDto> {
    const user = await this.userService.findByIdOrThrow(dto.userId);
    const accountType = await this.accountTypeRepository.findOneBy({
      id: user.account_id,
    });
    if (!user && !accountType) {
      throw new NotFoundException('User or role not found');
    }
    accountType.value = dto.value;
    accountType.description = dto.description;
    const entity = await this.accountTypeRepository.save(accountType);
    return AccountTypeMapper.toResponseDto(entity);
  }
}

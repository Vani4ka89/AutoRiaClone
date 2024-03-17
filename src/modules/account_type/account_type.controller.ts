import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/types/user-data.type';
import { AccountTypeService } from './account_type.service';
import { CreateAccountTypeRequestDto } from './dto/create-account-type.request.dto';
import { AccountTypeResponseDto } from './models/dto/response/account-type.response.dto';

@ApiTags('Account-type')
@Controller('account-type')
export class AccountTypeController {
  constructor(private readonly accountTypeService: AccountTypeService) {}

  @Post()
  public async createType(
    @Body() dto: CreateAccountTypeRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<AccountTypeResponseDto> {
    return await this.accountTypeService.createType(dto, userData);
  }

  @Get(':typeId')
  public async findById(
    @Param('typeId') typeId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<AccountTypeResponseDto> {
    return await this.accountTypeService.findById(typeId, userData);
  }
}

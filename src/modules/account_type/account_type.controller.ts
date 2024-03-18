import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AccountTypeEntity } from '../../database/entities/account-type.entity';
import { Roles } from '../role/decorators/roles.decorator';
import { ERoleAll } from '../role/enums/roles.enum';
import { RolesGuard } from '../role/guards/roles.guard';
import { UpdateAccountTypeRequestDto } from './models/dto/request/update-account-type.request.dto';
import { AccountTypeResponseDto } from './models/dto/response/account-type.response.dto';
import { AccountTypeService } from './services/account_type.service';

@ApiTags('Account-type')
@Controller('account-type')
export class AccountTypeController {
  constructor(private readonly accountTypeService: AccountTypeService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get account-type (for admin only)' })
  @Roles(ERoleAll.ADMIN)
  @UseGuards(RolesGuard)
  @Get(':value')
  public async findTypeByValue(
    @Param('value') value: string,
  ): Promise<AccountTypeEntity[]> {
    return await this.accountTypeService.findTypeByValue(value);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change account-type (for admin only)' })
  @Roles(ERoleAll.ADMIN)
  @UseGuards(RolesGuard)
  @Post('change')
  public async changeAccountType(
    @Body() dto: UpdateAccountTypeRequestDto,
  ): Promise<AccountTypeResponseDto> {
    return await this.accountTypeService.changeAccountType(dto);
  }
}

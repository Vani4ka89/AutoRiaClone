import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { EAccountType } from '../../../enums/account-type.enum';

export class CreateAccountTypeRequestDto {
  @ApiProperty()
  @IsEnum(EAccountType)
  @IsString()
  value: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}

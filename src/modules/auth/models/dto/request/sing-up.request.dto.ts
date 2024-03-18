import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

import { ERoleSimple } from '../../../../role/enums/roles.enum';
import { BaseUserRequestDto } from '../../../../user/models/dto/request/base-user.request.dto';

export class SingUpRequestDto extends PickType(BaseUserRequestDto, [
  'name',
  'email',
  'password',
]) {
  @ApiProperty({ example: 'buyer' })
  @IsEnum(ERoleSimple)
  @IsString()
  @Type(() => String)
  role: string;
}

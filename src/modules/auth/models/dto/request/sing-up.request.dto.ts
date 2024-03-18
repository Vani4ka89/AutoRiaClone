import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

import { CreateUserRequestDto } from '../../../../user/models/dto/request/create-user.request.dto';
import { ERoleSimple } from '../../../enums/roles.enum';

export class SingUpRequestDto extends PickType(CreateUserRequestDto, [
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

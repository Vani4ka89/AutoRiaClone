import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString, Length, Matches } from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { BaseUserRequestDto } from './base-user.request.dto';

export class UpdateUserRequestDto extends PickType(BaseUserRequestDto, [
  'age',
  'image',
]) {
  @ApiProperty({ example: 'Petro' })
  @IsString()
  @Length(1, 20)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name?: string;

  @ApiProperty({ example: 'nika@gmail.com' })
  @IsString()
  @Length(5, 30)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  @Transform(TransformHelper.trim)
  email?: string;
}

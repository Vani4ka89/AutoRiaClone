import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { CreateUserRequestDto } from './create-user.request.dto';

export class UpdateUserRequestDto extends PickType(CreateUserRequestDto, [
  'age',
  'image',
  'banned',
  'banReason',
]) {
  @ApiProperty({ example: 'Petro' })
  @IsString()
  @Length(1, 20)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name?: string;
}

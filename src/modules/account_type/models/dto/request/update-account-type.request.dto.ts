import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { CreateAccountTypeRequestDto } from './create-account-type.request.dto';

export class UpdateAccountTypeRequestDto extends PickType(
  CreateAccountTypeRequestDto,
  ['value', 'description'],
) {
  @ApiProperty()
  @IsString()
  userId: string;
}

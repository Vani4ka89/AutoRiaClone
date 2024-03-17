import { PickType } from '@nestjs/swagger';

import { CreateAccountTypeRequestDto } from './create-account-type.request.dto';

export class UpdateAccountTypeRequestDto extends PickType(
  CreateAccountTypeRequestDto,
  ['value', 'description'],
) {}

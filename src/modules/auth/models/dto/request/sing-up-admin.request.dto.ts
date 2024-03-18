import { PickType } from '@nestjs/swagger';

import { BaseUserRequestDto } from '../../../../user/models/dto/request/base-user.request.dto';

export class SingUpAdminRequestDto extends PickType(BaseUserRequestDto, [
  'name',
  'email',
  'password',
]) {}

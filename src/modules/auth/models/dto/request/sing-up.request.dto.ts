import { PickType } from '@nestjs/swagger';

import { CreateUserRequestDto } from '../../../../user/models/dto/request/create-user.request.dto';

export class SingUpRequestDto extends PickType(CreateUserRequestDto, [
  'name',
  'email',
  'password',
]) {}

import { PickType } from '@nestjs/swagger';

import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PickType(CreateRoleDto, [
  'value',
  'description',
]) {}

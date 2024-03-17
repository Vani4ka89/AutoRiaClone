import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

import { ERole } from '../../../../auth/enums/roles.enum';

export class AddRoleRequestDto {
  @ApiProperty({ description: 'Must be a string' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'seller' })
  @IsEnum(ERole)
  @IsString()
  value: string;
}

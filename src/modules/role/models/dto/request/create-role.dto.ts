import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  value: string;

  @ApiProperty({ example: 'Main platform administrator' })
  @IsString()
  description?: string;
}

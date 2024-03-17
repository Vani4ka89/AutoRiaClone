import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { ECurrency } from '../../../enums/currency.enum';

export class CreateCarRequestDto {
  @ApiProperty({ example: 'Honda' })
  @IsString()
  brand: string;

  @ApiProperty({ example: 'Accord' })
  @IsString()
  model: string;

  @ApiProperty({ example: '12000' })
  @IsOptional()
  @IsInt()
  price?: number;

  @ApiProperty({ example: '2015' })
  @IsOptional()
  @Min(1990)
  @Max(new Date().getFullYear())
  @IsInt()
  year?: number;

  @ApiProperty({ example: 'USD' })
  @IsOptional()
  @IsEnum(ECurrency)
  @IsString()
  currency?: string;
}

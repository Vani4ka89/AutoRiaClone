import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { EAccountType } from '../../../../account_type/enums/account-type.enum';
import { ERoleAll } from '../../../../role/enums/roles.enum';

export class BaseUserRequestDto {
  @ApiProperty({ example: 'Nika' })
  @IsString()
  @Length(1, 20)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name: string;

  @ApiProperty({ example: '23' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  age?: number;

  @ApiProperty({ description: 'photo' })
  @IsOptional()
  @IsString()
  @Length(0, 3000)
  image?: string;

  @ApiProperty({ example: 'nika@gmail.com' })
  @IsString()
  @Length(5, 30)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  @Transform(TransformHelper.trim)
  email: string;

  @ApiProperty({ example: 'P@$$word1' })
  @IsString()
  @Length(8, 30)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
  @Transform(TransformHelper.trim)
  password: string;

  @ApiProperty({ example: 'manager' })
  @IsEnum(ERoleAll)
  @IsString()
  @Type(() => String)
  role: string;

  @ApiProperty({ example: 'premium' })
  @IsEnum(EAccountType)
  @IsString()
  @Type(() => String)
  accountType: string;

  @ApiProperty({ example: 'false' })
  @IsOptional()
  @IsBoolean()
  banned?: boolean;

  @ApiProperty()
  @IsOptional()
  @Length(5, 200)
  @IsString()
  banReason?: string;
}

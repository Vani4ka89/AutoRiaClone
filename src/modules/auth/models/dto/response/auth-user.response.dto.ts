import { Exclude } from 'class-transformer';

import { AccountTypeResponseDto } from '../../../../account_type/models/dto/response/account-type.response.dto';
import { RoleResponseDto } from '../../../../role/models/dto/response/role.response.dto';
import { UserResponseDto } from '../../../../user/models/dto/response/user.response.dto';
import { TokenResponseDto } from './token.response.dto';

@Exclude()
export class AuthUserResponseDto {
  user: UserResponseDto;
  role?: RoleResponseDto;
  accountType?: AccountTypeResponseDto;
  tokens?: TokenResponseDto;
}

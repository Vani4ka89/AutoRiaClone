import { UserEntity } from '../../../database/entities/user.entity';
import { AccountTypeMapper } from '../../account_type/services/account-type.mapper';
import { RoleMapper } from '../../role/services/role.mapper';
import { UserMapper } from '../../user/services/user.mapper';
import { AuthUserResponseDto } from '../models/dto/response/auth-user.response.dto';
import { ITokenPair } from '../types/token.type';

export class AuthMapper {
  public static toResponseSignUpDto(user: UserEntity): AuthUserResponseDto {
    return {
      user: UserMapper.toResponseDto(user),
      role: RoleMapper.toResponseDto(user.role),
      accountType: AccountTypeMapper.toResponseDto(user.accountType),
    };
  }

  public static toResponseSignInDto(
    user: UserEntity,
    tokens: ITokenPair,
  ): AuthUserResponseDto {
    return {
      user: UserMapper.toResponseDto(user),
      tokens,
    };
  }
}

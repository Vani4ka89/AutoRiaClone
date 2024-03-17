import { UserEntity } from '../../../database/entities/user.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { AuthUserResponseDto } from '../models/dto/response/auth-user.response.dto';
import { TokenResponseDto } from '../models/dto/response/token.response.dto';

export class AuthMapper {
  public static toResponseSignUpDto(
    userEntity: UserEntity,
  ): Partial<AuthUserResponseDto> {
    return {
      user: UserMapper.toResponseDto(userEntity),
    };
  }

  public static toResponseSignInDto(
    user: UserEntity,
    tokens: TokenResponseDto,
  ): AuthUserResponseDto {
    return {
      user: UserMapper.toResponseDto(user),
      tokens,
    };
  }

  public static toResponseAdminDto(user: UserEntity): AuthUserResponseDto {
    return {
      user: UserMapper.toResponseDto(user),
    };
  }
}

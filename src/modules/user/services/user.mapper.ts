import { UserEntity } from '../../../database/entities/user.entity';
import { RoleMapper } from '../../role/services/role.mapper';
import { UserResponseDto } from '../models/dto/response/user.response.dto';

export class UserMapper {
  public static toResponseDto(userEntity: UserEntity): UserResponseDto {
    return {
      id: userEntity.id,
      name: userEntity.name,
      age: userEntity.age,
      image: userEntity.image,
      email: userEntity.email,
      banned: userEntity.banned,
      banReason: userEntity.banReason,
      created: userEntity.created,
      updated: userEntity.updated,
      role: RoleMapper.toResponseDto(userEntity.role),
    };
  }
}

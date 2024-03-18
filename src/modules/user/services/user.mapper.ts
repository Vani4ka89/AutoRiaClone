import { UserEntity } from '../../../database/entities/user.entity';
import { UserResponseDto } from '../models/dto/response/user.response.dto';

export class UserMapper {
  public static toResponseDto(user: UserEntity): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      roleId: user.role_id,
      age: user.age,
      image: user.image,
      email: user.email,
      banned: user.banned,
      banReason: user.banReason,
      created: user.created,
      updated: user.updated,
    };
  }
}

import { RoleResponseDto } from '../../../../role/models/dto/response/role.response.dto';

export class UserResponseDto {
  id: string;
  name: string;
  age: number;
  image: string;
  email: string;
  banned: boolean;
  banReason: string;
  created: Date;
  updated: Date;
  role?: RoleResponseDto;
}

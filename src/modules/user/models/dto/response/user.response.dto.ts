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
  roleId: string;
}

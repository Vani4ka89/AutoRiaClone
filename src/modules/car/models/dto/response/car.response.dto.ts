import { UserResponseDto } from '../../../../user/models/dto/response/user.response.dto';

export class CarResponseDto {
  id: string;
  brand: string;
  model: string;
  price: number;
  year: number;
  currency: string;
  isActive: boolean;
  created: Date;
  updated: Date;
  user?: UserResponseDto;
}

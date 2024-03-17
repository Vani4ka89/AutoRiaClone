import { CarEntity } from '../../../database/entities/car.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { CarResponseDto } from '../models/dto/response/car.response.dto';

export class CarAdMapper {
  public static toResponseDto(carEntity: CarEntity): CarResponseDto {
    return {
      id: carEntity.id,
      brand: carEntity.brand,
      model: carEntity.model,
      price: carEntity.price,
      year: carEntity.year,
      currency: carEntity.currency,
      isActive: carEntity.isActive,
      created: carEntity.created,
      updated: carEntity.updated,
      user: carEntity.user ? UserMapper.toResponseDto(carEntity.user) : null,
    };
  }
}

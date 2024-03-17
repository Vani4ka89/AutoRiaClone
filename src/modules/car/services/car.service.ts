import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { IUserData } from '../../auth/types/user-data.type';
import { CarRepository } from '../../repository/services/car.repository';
import { CreateCarRequestDto } from '../models/dto/request/create-car.request.dto';
import { UpdateCarRequestDto } from '../models/dto/request/update-car.request.dto';
import { CarResponseDto } from '../models/dto/response/car.response.dto';
import { CarAdMapper } from './car-ad.mapper';

@Injectable()
export class CarService {
  constructor(private readonly carRepository: CarRepository) {}

  public async createCarAd(
    dto: CreateCarRequestDto,
    userData: IUserData,
  ): Promise<CarResponseDto> {
    const car = await this.carRepository.save(
      this.carRepository.create({ ...dto, user_id: userData.userId }),
    );
    return CarAdMapper.toResponseDto(car);
  }

  public async getCarAdById(carId: string): Promise<CarResponseDto> {
    const car = await this.carRepository.findOne({
      where: { id: carId },
      relations: { user: true },
    });
    if (!car) {
      throw new UnprocessableEntityException('CarAd not found');
    }
    return CarAdMapper.toResponseDto(car);
  }

  public async findMyAd(userData: IUserData): Promise<CarResponseDto> {
    const car = await this.carRepository.findOneBy({
      user_id: userData.userId,
    });
    if (!car) {
      throw new UnprocessableEntityException('CarAd not found');
    }
    return CarAdMapper.toResponseDto(car);
  }

  public async editMyAd(
    userData: IUserData,
    dto: UpdateCarRequestDto,
  ): Promise<CarResponseDto> {
    const car = await this.carRepository.findOneBy({
      user_id: userData.userId,
    });
    if (!car) {
      throw new UnprocessableEntityException('CarAd not found');
    }
    const editedCar = await this.carRepository.save(
      this.carRepository.create({ ...car, ...dto }),
    );
    return CarAdMapper.toResponseDto(editedCar);
  }

  public async removeMyAd(carId: string, userData: IUserData): Promise<void> {
    const car = await this.carRepository.findOne({
      where: { id: carId, user_id: userData.userId },
    });
    if (!car) {
      throw new UnprocessableEntityException('CarAd not found');
    }
    await this.carRepository.remove(car);
  }
}

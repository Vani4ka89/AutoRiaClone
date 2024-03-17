import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/types/user-data.type';
import { CreateCarRequestDto } from './models/dto/request/create-car.request.dto';
import { UpdateCarRequestDto } from './models/dto/request/update-car.request.dto';
import { CarResponseDto } from './models/dto/response/car.response.dto';
import { CarService } from './services/car.service';

@ApiTags('CarAd')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create car advertisement' })
  @Post()
  public async createCarAd(
    @Body() dto: CreateCarRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<CarResponseDto> {
    return await this.carService.createCarAd(dto, userData);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Get public car advertisement' })
  @Get(':carId')
  public async getCarAdById(
    @Param('carId') carId: string,
  ): Promise<CarResponseDto> {
    return await this.carService.getCarAdById(carId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my car advertisement' })
  @Get('me')
  public async findMyAd(
    @CurrentUser() userData: IUserData,
  ): Promise<CarResponseDto> {
    return await this.carService.findMyAd(userData);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update my car advertisement' })
  @Put('me')
  public async editMyAd(
    @Body() dto: UpdateCarRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<CarResponseDto> {
    return await this.carService.editMyAd(userData, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete car advertisement' })
  @Delete(':carId')
  public async removeMyAd(
    @Param('carId') carId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.carService.removeMyAd(carId, userData);
  }
}

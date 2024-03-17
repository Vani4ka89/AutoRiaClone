import { PickType } from '@nestjs/swagger';

import { CreateCarRequestDto } from './create-car.request.dto';

export class UpdateCarRequestDto extends PickType(CreateCarRequestDto, [
  'brand',
  'model',
  'price',
  'year',
  'currency',
]) {}

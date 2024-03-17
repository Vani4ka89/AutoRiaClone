import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { CarController } from './car.controller';
import { CarService } from './services/car.service';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}

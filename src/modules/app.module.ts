import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../configs/configuration';
import { AccountTypeModule } from './account_type/account_type.module';
import { AuthModule } from './auth/auth.module';
import { CarModule } from './car/car.module';
import { ListingInfoModule } from './listing_info/listing_info.module';
import { PostgresModule } from './postgres/postgres.module';
import { RedisModule } from './redis/redis.module';
import { RepositoryModule } from './repository/repository.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PostgresModule,
    RedisModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    CarModule,
    RepositoryModule,
    RoleModule,
    AccountTypeModule,
    ListingInfoModule,
  ],
})
export class AppModule {}

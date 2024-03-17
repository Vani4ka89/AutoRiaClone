import { Global, Module } from '@nestjs/common';

import { AccountTypeRepository } from './services/account-type.repository';
import { CarRepository } from './services/car.repository';
import { ListingInfoRepository } from './services/listing-info.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { RoleRepository } from './services/role.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  AccountTypeRepository,
  CarRepository,
  ListingInfoRepository,
  UserRepository,
  RefreshTokenRepository,
  RoleRepository,
];

@Global()
@Module({
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}

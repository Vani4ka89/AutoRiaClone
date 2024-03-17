import { Module } from '@nestjs/common';

import { ListingInfoController } from './listing_info.controller';
import { ListingInfoService } from './listing_info.service';

@Module({
  controllers: [ListingInfoController],
  providers: [ListingInfoService],
})
export class ListingInfoModule {}

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ListingInfoEntity } from '../../../database/entities/listing-info.entity';

@Injectable()
export class ListingInfoRepository extends Repository<ListingInfoEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ListingInfoEntity, dataSource.manager);
  }
}

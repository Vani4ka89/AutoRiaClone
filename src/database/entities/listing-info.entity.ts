import { Column, Entity, OneToOne } from 'typeorm';

import { CarEntity } from './car.entity';
import { ETableName } from './enums/table-name.enum';
import { BaseModel } from './model/base-model';

@Entity(ETableName.LISTING_INFO)
export class ListingInfoEntity extends BaseModel {
  @Column('int', { nullable: true })
  views?: number;

  @Column('int', { nullable: true })
  viewsPerDay?: number;

  @Column('int', { nullable: true })
  viewsPerWeek?: number;

  @Column('int', { nullable: true })
  viewsPerMonth?: number;

  @Column('int', { nullable: true })
  averagePriceInRegion?: number;

  @OneToOne(() => CarEntity, (entity) => entity.listing)
  car?: CarEntity;
}

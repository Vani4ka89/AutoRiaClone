import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { ETableName } from './enums/table-name.enum';
import { ListingInfoEntity } from './listing-info.entity';
import { BaseModel } from './model/base-model';
import { UserEntity } from './user.entity';

@Entity(ETableName.CAR)
export class CarEntity extends BaseModel {
  @Column('text')
  brand: string;

  @Column('text')
  model: string;

  @Column('int')
  price: number;

  @Column('int')
  year: number;

  @Column('text', { nullable: true })
  currency?: string;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column()
  listing_id: string;
  @OneToOne(() => ListingInfoEntity, (entity) => entity.car)
  @JoinColumn({ name: 'listing_id' })
  listing?: ListingInfoEntity;
}

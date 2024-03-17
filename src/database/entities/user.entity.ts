import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AccountTypeEntity } from './account-type.entity';
import { CarEntity } from './car.entity';
import { ETableName } from './enums/table-name.enum';
import { BaseModel } from './model/base-model';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RoleEntity } from './role.entity';

@Entity(ETableName.USER)
export class UserEntity extends BaseModel {
  @Column('text')
  name: string;

  @Column('int', { nullable: true })
  age?: number;

  @Column('text', { nullable: true })
  image?: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column({ type: 'boolean', default: false })
  banned: boolean;

  @Column('text', { nullable: true })
  banReason?: string;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => CarEntity, (entity) => entity.user)
  cars?: CarEntity[];

  @Column()
  role_id: string;
  @ManyToOne(() => RoleEntity, (entity) => entity.users)
  @JoinColumn({ name: 'role_id' })
  role?: RoleEntity;

  @Column()
  account_id: string;
  @ManyToOne(() => AccountTypeEntity, (entity) => entity.users)
  @JoinColumn({ name: 'account_id' })
  accountType?: AccountTypeEntity;
}

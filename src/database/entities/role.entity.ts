import { Column, Entity, OneToMany } from 'typeorm';

import { ETableName } from './enums/table-name.enum';
import { BaseModel } from './model/base-model';
import { UserEntity } from './user.entity';

@Entity(ETableName.ROLE)
export class RoleEntity extends BaseModel {
  @Column('text')
  value: string;

  @Column('text', { nullable: true })
  description?: string;

  @OneToMany(() => UserEntity, (entity) => entity.role)
  users?: UserEntity[];
}

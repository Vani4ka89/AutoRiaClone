import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ETableName } from './enums/table-name.enum';
import { BaseModel } from './model/base-model';
import { UserEntity } from './user.entity';

@Entity(ETableName.REFRESH_TOKEN)
export class RefreshTokenEntity extends BaseModel {
  @Column('text')
  refreshToken: string;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}

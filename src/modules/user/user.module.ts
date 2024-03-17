import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../role/role.module';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [RoleModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

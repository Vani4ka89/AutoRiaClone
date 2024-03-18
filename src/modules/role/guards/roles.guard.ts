import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RoleRepository } from '../../repository/services/role.repository';
import { UserService } from '../../user/services/user.service';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
    private readonly roleRepository: RoleRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    try {
      if (!requiredRoles) {
        return true;
      }
      const { user } = context.switchToHttp().getRequest();
      const userEntity = await this.userService.findByIdOrThrow(user.userId);
      const role = await this.roleRepository.findOneBy({
        id: userEntity.role_id,
      });
      return requiredRoles.includes(role.value);
    } catch (e) {
      throw new ForbiddenException('No access rights');
    }
  }
}

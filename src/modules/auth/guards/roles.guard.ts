// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
//
// import { ROLES_KEY } from '../decorators/roles.decorator';
// import { ERole } from '../enums/roles.enum';
//
// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}
//
//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true;
//     }
//     const { user } = context.switchToHttp().getRequest();
//     // console.log(user);
//     return requiredRoles.some((role) => user.roles?.includes(role));
//   }
// }

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     private readonly userService: UserService,
//   ) {}
//
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass,
//     ]);
//     const request = context.switchToHttp().getRequest();
//
//     if (request?.user) {
//       const { userId } = request.user;
//       const user = await this.userService.getProfileById(userId);
//       console.log(user);
//       const value = user.roles.map((role) => role.value);
//       console.log(value);
//       return roles.some((role) => role.includes(value[0]));
//     }
//     throw new ForbiddenException('Access denied');
//   }
// }

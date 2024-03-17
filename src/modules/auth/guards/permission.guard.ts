// // import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
//
// import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
//
// import RequestWithUser from '../authentication/requestWithUser.interface';
// import { JwtAccessGuard } from './jwt-access.guard';
// import Permission from './permission.type';
//
// export const PermissionGuard = (permission: Permission): Type<CanActivate> => {
//   class PermissionGuardMixin extends JwtAccessGuard {
//     async canActivate(context: ExecutionContext) {
//       await super.canActivate(context);
//
//       const request = context.switchToHttp().getRequest<RequestWithUser>();
//       const user = request.user;
//
//       return user?.permissions.includes(permission);
//     }
//   }
//
//   return mixin(PermissionGuardMixin);
// };
//
// // export const PermissionGuard = (permission: ERole): Type<CanActivate> => {
// //   class PermissionGuardMixin extends JwtAccessGuard {
// //     async canActivate(context: ExecutionContext) {
// //       await super.canActivate(context);
// //
// //       const request = context.switchToHttp().getRequest();
// //       const user = request.user;
// //
// //       if (!user || !user.permissions) {
// //         return false;
// //       }
// //
// //       return user.permissions.includes(permission);
// //     }
// //   }
// //
// //   return mixin(PermissionGuardMixin);
// // };

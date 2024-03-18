import { SetMetadata } from '@nestjs/common';

import { ERoleAll } from '../enums/roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ERoleAll[]) => SetMetadata(ROLES_KEY, roles);

import { SetMetadata } from '@nestjs/common';
import { Roles } from '../common/roles.enum';

export const AllowRoles = (...roles: Roles[]) => SetMetadata('roles', roles);

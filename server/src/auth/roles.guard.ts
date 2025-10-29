import { CanActivate, ExecutionContext, ForbiddenException, Injectable, SetMetadata } from '@nestjs/common';
import { Roles } from '@/schemas/enums';
import { Reflector } from '@nestjs/core';
import { AuthenticatedRequest } from '@/auth/interfaces/authenticated-request.interface';

export const USER_ROLES_KEY = 'roles';
export const UserRoles = (...roles: Roles[]) => SetMetadata(USER_ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(USER_ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest<AuthenticatedRequest>();

    if (!requiredRoles.some((role) => user.role === role)) {
      throw new ForbiddenException('User role does not have access to this resource');
    }

    return true;
  }
}

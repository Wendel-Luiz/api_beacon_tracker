import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '../decorators/requirePermission.decorator';
import { Permission as PermissionEnum } from '../enums/permissions.enum';
import { JwtLocalService } from '../utils/jwt.service';
import { PermissionRepository } from '../repositories/permission.repository';
import { UserRequest } from 'src/shared/schemas/user.schema';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtLocalService: JwtLocalService,
    private reflector: Reflector,
    private permissionRepo: PermissionRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionEnum[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtLocalService.validate(token);

      request['user'] = {
        id: payload.sub,
        role: payload.role,
      } as UserRequest;

      const userPermissions = await this.permissionRepo.findPermissionsByRole(
        payload.role,
      );

      const havePermission = requiredPermissions.some((permission) =>
        userPermissions?.find(
          (userPermission) => userPermission?.slug === permission,
        ),
      );

      return havePermission;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

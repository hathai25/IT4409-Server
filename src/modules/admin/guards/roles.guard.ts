import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/common/enum';
import { ROLES_KEY } from '../decorator/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private refector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requriedRoles = this.refector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requriedRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        return requriedRoles.some((role) => user.roles.includes(role));
    }
}

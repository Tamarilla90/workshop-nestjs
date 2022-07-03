import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Reflector} from "@nestjs/core";
import {Role} from "./role.enum";
import {ROLES_KEY} from "./roles.decorator";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private reflector: Reflector) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const {jwt} = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => jwt.scope?.includes(role));
    }
}

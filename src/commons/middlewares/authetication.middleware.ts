import {Injectable, NestMiddleware, UnauthorizedException} from '@nestjs/common';
import jwt_decode from "jwt-decode";
import {NextFunction} from "express";

@Injectable()
export class AutheticationMiddleware implements NestMiddleware {
    use(req: any, res: Response, next: NextFunction) {
        const headers = new Map<string, string>(Object.entries(req.headers));
        const jwt = headers.get('authorization');
        if (jwt) {
            const decodeJwt = jwt_decode(jwt);
            req.jwt = decodeJwt;
            next();
        } else {
            next(new UnauthorizedException());
        }

    }
}

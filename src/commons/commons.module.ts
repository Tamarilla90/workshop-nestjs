import {Module} from '@nestjs/common';
import {ValidationPipe} from "./pipe/validation.pipe";
import {AutheticationMiddleware} from "./middlewares/authetication.middleware";
import {RoleGuard} from "./guard/role.guard";
import {TransformResponseInterceptor} from "./interceptor/transform-response.interceptor";

@Module({
    providers: [ValidationPipe, AutheticationMiddleware, RoleGuard, TransformResponseInterceptor],
    exports: [ValidationPipe, AutheticationMiddleware, RoleGuard, TransformResponseInterceptor]
})
export class CommonsModule {
}

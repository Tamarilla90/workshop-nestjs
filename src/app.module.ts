import {MiddlewareConsumer, Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommonsModule} from './commons/commons.module';
import {APP_GUARD, APP_INTERCEPTOR, APP_PIPE} from "@nestjs/core";
import {ValidationPipe} from "./commons/pipe/validation.pipe";
import {AutheticationMiddleware} from "./commons/middlewares/authetication.middleware";
import {RoleGuard} from "./commons/guard/role.guard";
import {TransformResponseInterceptor} from "./commons/interceptor/transform-response.interceptor";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: 'localhost',
            port: 27017,
            database: 'users',
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoLoadEntities: true,
            synchronize: true,
        }),
        CommonsModule,
        UserModule,
    ],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformResponseInterceptor
        }
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AutheticationMiddleware)
            .forRoutes('user');
    }
}

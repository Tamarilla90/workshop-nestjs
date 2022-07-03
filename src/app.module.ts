import {MiddlewareConsumer, Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommonsModule} from './commons/commons.module';
import {APP_PIPE} from "@nestjs/core";
import {ValidationPipe} from "./commons/pipe/validation.pipe";
import {AutheticationMiddleware} from "./commons/middlewares/authetication.middleware";

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
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AutheticationMiddleware)
            .forRoutes('user');
    }
}

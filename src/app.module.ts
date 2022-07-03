import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [UserModule,
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
    ],
})
export class AppModule {
}

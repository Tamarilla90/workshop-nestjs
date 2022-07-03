import {Module} from '@nestjs/common';
import {ValidationPipe} from "./pipe/validation.pipe";
import {AutheticationMiddleware} from "./middlewares/authetication.middleware";

@Module({
    providers: [ValidationPipe, AutheticationMiddleware],
    exports: [ValidationPipe, AutheticationMiddleware]
})
export class CommonsModule {
}

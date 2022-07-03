import {Module} from '@nestjs/common';
import {ValidationPipe} from "./pipe/validation.pipe";

@Module({
    providers: [ValidationPipe],
    exports: [ValidationPipe]
})
export class CommonsModule {
}

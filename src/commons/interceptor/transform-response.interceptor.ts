import {CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException} from '@nestjs/common';
import {map, Observable} from 'rxjs';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(data => {
            if (data === null) {
                throw new NotFoundException();
            }
            return data;
        }));
    }
}

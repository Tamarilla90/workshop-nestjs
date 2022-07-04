import {TransformResponseInterceptor} from './transform-response.interceptor';
import {catchError, of} from "rxjs";
import {ExecutionContext, NotFoundException} from "@nestjs/common";

describe('TransformResponseInterceptor', () => {
    let interceptor: TransformResponseInterceptor;

    const nextMock = {
        handle: jest.fn(),
    };

    const ctxMock = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
    } as unknown as jest.Mocked<ExecutionContext>;

    beforeAll(() => {
        interceptor = new TransformResponseInterceptor()
    });


    it('should be defined', () => {
        expect(interceptor).toBeDefined();
    });

    it('should send error when no exist data', () => {
        let error;
        nextMock.handle.mockReturnValue(of(null));
        interceptor.intercept(ctxMock, nextMock).pipe(catchError(err => error = err)).subscribe();
        expect(error).toStrictEqual(new NotFoundException());
    });

    it('should send data when no exist data', () => {
        let response;
        const data = {}
        nextMock.handle.mockReturnValue(of(data));
        interceptor.intercept(ctxMock, nextMock).pipe().subscribe((da) => response = da);
        expect(response).toStrictEqual(data);
    });
});

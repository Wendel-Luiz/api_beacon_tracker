import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/base/response.schema';

@Injectable()
export class GlobalResponseInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();

        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const path = request['url'];
        const statusCode = response['statusCode'];

        return {
          statusCode,
          path,
          message: 'success',
          data,
        } as Response;
      }),
    );
  }
}

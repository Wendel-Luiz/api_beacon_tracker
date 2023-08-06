import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ZodValidationException } from 'nestjs-zod';
import { BaseException } from 'src/base/base.exception';
import { Error, Response } from 'src/base/response.schema';
import { ErrorType } from 'src/enums/errorTypes.enum';
import { RefCode } from 'src/enums/refCodes.enum';

interface FormatedException {
  statusCode: number;
  httpMessage: string;
  errors: Error[];
}

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const url = ctx.getRequest()['url'];
    const formated = this.formatException(exception);

    const responseBody: Response = {
      statusCode: formated.statusCode,
      message: formated.httpMessage,
      path: url,
      errors: formated.errors,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, formated.statusCode);
  }

  private formatException(exception: unknown): FormatedException {
    if (exception instanceof BaseException) {
      return {
        statusCode: exception.statusCode,
        httpMessage: exception.genericMessage,
        errors: this.errorsFromHttpException(exception),
      };
    }

    if (exception instanceof ZodValidationException) {
      return {
        statusCode: 400,
        httpMessage: 'Validation failed',
        errors: this.errorsFromZodValidation(exception),
      };
    }

    if (exception instanceof NotFoundException) {
      return {
        statusCode: 404,
        httpMessage: 'Url not found',
        errors: this.errorFromNotFoundException(exception),
      };
    }

    if (
      exception instanceof UnauthorizedException ||
      exception instanceof ForbiddenException
    ) {
      return {
        statusCode: 401,
        httpMessage: 'Unauthorized',
        errors: this.errorFromUnauthorizedException(exception),
      };
    }

    console.error(
      'timestamp: ' +
        new Date().toISOString() +
        '\n' +
        (exception as any).stack,
    );

    return {
      statusCode: 500,
      httpMessage: 'Internal Server Error',
      errors: [
        {
          message:
            'An unexpected error has occurred. Contact your system administrator',
          type: ErrorType.Unknown,
          refCode: RefCode.InternalServerError,
        },
      ],
    };
  }

  private errorsFromHttpException(exception: BaseException): Error[] {
    return [
      {
        message: exception.message,
        type: exception.type,
        refCode: exception.refCode,
      },
    ];
  }

  private errorsFromZodValidation(exception: ZodValidationException): Error[] {
    const errors = exception.getResponse()['errors'];
    return Object.values(errors).map((error: any) => ({
      message:
        'field ' +
        '<' +
        error?.path?.map((value) => value).join('.') +
        '> ' +
        'Validation: ' +
        '<' +
        error.message +
        '>',
      type: ErrorType.Validation,
      refCode: RefCode.ValidationFailed,
    }));
  }

  private errorFromNotFoundException(exception: NotFoundException): Error[] {
    return [
      {
        message: exception.message,
        type: ErrorType.UrlNotFound,
        refCode: RefCode.UrlNotFound,
      },
    ];
  }

  private errorFromUnauthorizedException(
    exception: UnauthorizedException | ForbiddenException,
  ): Error[] {
    return [
      {
        message: exception.message,
        type: ErrorType.Unauthorized,
        refCode: RefCode.Unauthorized,
      },
    ];
  }
}

import { BaseException } from 'src/base/base.exception';
import { ErrorType } from 'src/enums/errorTypes.enum';
import { RefCode } from 'src/enums/refCodes.enum';

export class EntityNotFound extends BaseException {
  constructor(message: string) {
    super({
      message,
      genericMessage: 'Entity not found',
      type: ErrorType.BusinessLogic,
      refCode: RefCode.EntityNotFound,
      statusCode: 404,
    });
  }
}

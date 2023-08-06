import { BaseException } from 'src/base/base.exception';
import { ErrorType } from 'src/enums/errorTypes.enum';
import { RefCode } from 'src/enums/refCodes.enum';

export class Unauthorized extends BaseException {
  constructor(message: string) {
    super({
      message,
      genericMessage: 'Unauthorized',
      type: ErrorType.BusinessLogic,
      refCode: RefCode.InsufficientPermission,
      statusCode: 401,
    });
  }
}

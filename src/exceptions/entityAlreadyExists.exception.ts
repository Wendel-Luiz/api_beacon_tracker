import { BaseException } from 'src/base/base.exception';
import { ErrorType } from 'src/enums/errorTypes.enum';
import { RefCode } from 'src/enums/refCodes.enum';

export class EntityAlreadyExists extends BaseException {
  constructor(message: string) {
    super({
      message,
      genericMessage: 'Entity already exists',
      type: ErrorType.BusinessLogic,
      refCode: RefCode.EntityAlreadyExists,
      statusCode: 409,
    });
  }
}

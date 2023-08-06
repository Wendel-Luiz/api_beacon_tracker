import { ErrorType } from 'src/enums/errorTypes.enum';
import { RefCode } from 'src/enums/refCodes.enum';

export class BaseException extends Error {
  constructor(data: {
    message: string;
    genericMessage: string;
    type: ErrorType;
    statusCode: number;
    refCode: RefCode;
  }) {
    super(data.message);

    this.genericMessage = data.genericMessage;
    this.type = data.type;
    this.statusCode = data.statusCode;
    this.refCode = data.refCode;
  }

  genericMessage: string;
  refCode: RefCode;
  statusCode: number;
  type: ErrorType;
}

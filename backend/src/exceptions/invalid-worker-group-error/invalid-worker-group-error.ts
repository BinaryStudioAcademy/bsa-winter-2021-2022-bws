import { ExceptionMessage, HttpCode } from '~/common/enums/enums';

const DEFAULT_MESSAGE = ExceptionMessage.WORKER_GROUP;

class InvalidWorkerGroupError extends Error {
  status: HttpCode;

  constructor({ status = HttpCode.DENIED, message = DEFAULT_MESSAGE } = {}) {
    super(message);
    this.status = status;
  }
}

export { InvalidWorkerGroupError };

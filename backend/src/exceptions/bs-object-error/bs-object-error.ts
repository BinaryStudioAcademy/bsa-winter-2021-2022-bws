import { ExceptionMessage, HttpCode } from '~/common/enums/enums';

type Constructor = {
  status?: HttpCode;
  message?: string;
};

const DEFAULT_MESSAGE = ExceptionMessage.OBJECT_NOT_UPLOADED;

class BsObjectError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.DENIED,
    message = DEFAULT_MESSAGE,
  }: Constructor = {}) {
    super(message);
    this.status = status;
  }
}

export { BsObjectError };

import { HttpCode } from '~/common/enums/enums';

const DEFAULT_MESSAGE = 'Group with this name already exists';

class InvalidGroupNameError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.BAD_REQUEST,
    message = DEFAULT_MESSAGE,
  } = {}) {
    super(message);
    this.status = status;
  }
}

export { InvalidGroupNameError };

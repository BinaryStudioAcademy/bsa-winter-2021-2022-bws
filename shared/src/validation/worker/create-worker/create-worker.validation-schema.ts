import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { EAMCreateWorkerRequestDto } from '~/common/types/types';
import {
  EAMWorkerValidationMessage,
  EAMWorkerValidationRule,
} from '~/common/enums/enums';

const EAMCreateWorker = Joi.object({
  [getNameOf<EAMCreateWorkerRequestDto>('name')]: Joi.string()
    .trim()
    .min(EAMWorkerValidationRule.NAME_MIN_LENGTH)
    .max(EAMWorkerValidationRule.NAME_MAX_LENGTH)
    .regex(EAMWorkerValidationRule.NAME_REGEX)
    .required()
    .messages({
      'string.empty': EAMWorkerValidationMessage.NAME_REQUIRE,
      'string.min': EAMWorkerValidationMessage.NAME_MIN_LENGTH,
      'string.pattern.base': EAMWorkerValidationMessage.NAME_REGEX,
    }),
});

export { EAMCreateWorker };
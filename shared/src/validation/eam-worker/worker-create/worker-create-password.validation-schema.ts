import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { EAMWorkerCreateRequestDto } from '~/common/types/types';
import {
  EAMWorkerValidationMessage,
  EAMWorkerValidationRule,
} from '~/common/enums/enums';

const EamWorkerCreate = Joi.object({
  [getNameOf<EAMWorkerCreateRequestDto>('password')]: Joi.string()
    .trim()
    .required()
    .regex(EAMWorkerValidationRule.PASSWORD_PATTERN)
    .ruleset.min(EAMWorkerValidationRule.PASSWORD_MIN_LENGTH)
    .max(EAMWorkerValidationRule.PASSWORD_MAX_LENGTH)
    .rule({ message: EAMWorkerValidationMessage.PASSWORD_LENGTH })
    .messages({
      'string.empty': EAMWorkerValidationMessage.PASSWORD_REQUIRE,
      'string.pattern.base': EAMWorkerValidationMessage.PASSWORD_LENGTH,
    }),
});

export { EamWorkerCreate };

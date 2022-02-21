import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { SCInstanceCreateRequestDto } from '~/common/types/types';
import {
  SCInstanceValidationRule,
  SCInstanceValidationMessage,
} from '~/common/enums/enums';

const scInstanceCreate = Joi.object({
  [getNameOf<SCInstanceCreateRequestDto>('name')]: Joi.string()
    .trim()
    .min(SCInstanceValidationRule.NAME_MIN_LENGTH)
    .max(SCInstanceValidationRule.NAME_MAX_LENGTH)
    .regex(SCInstanceValidationRule.NAME_PATTERN)
    .required()
    .messages({
      'string.empty': SCInstanceValidationMessage.NAME_REQUIRE,
      'string.min': SCInstanceValidationMessage.NAME_LENGTH,
      'string.max': SCInstanceValidationMessage.NAME_LENGTH,
      'string.pattern.base': SCInstanceValidationMessage.NAME_PATTERN,
    }),
  [getNameOf<SCInstanceCreateRequestDto>('operationSystemId')]: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': SCInstanceValidationMessage.NAME_REQUIRE,
    }),
});

export { scInstanceCreate };

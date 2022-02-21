import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { BSSpaceCreateRequestDto } from '~/common/types/types';
import {
  BSSpaceValidationMessage,
  BSSpaceValidationRule,
} from '~/common/enums/enums';

const bsSpaceCreate = Joi.object({
  [getNameOf<BSSpaceCreateRequestDto>('name')]: Joi.string()
    .trim()
    .min(BSSpaceValidationRule.NAME_MIN_LENGTH)
    .max(BSSpaceValidationRule.NAME_MAX_LENGTH)
    .regex(BSSpaceValidationRule.NAME_REGEX)
    .required()
    .messages({
      'string.empty': BSSpaceValidationMessage.NAME_REQUIRE,
      'string.min': BSSpaceValidationMessage.NAME_LENGTH,
      'string.max': BSSpaceValidationMessage.NAME_LENGTH,
      'string.pattern.base': BSSpaceValidationMessage.NAME_REGEX,
    }),
});

export { bsSpaceCreate };

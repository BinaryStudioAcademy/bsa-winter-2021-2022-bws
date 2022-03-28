import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { SLCFunctionLoadParamsDto } from '~/common/types/types';
import {
  UUIDValidationRule,
  UUIDValidationMessage,
} from '~/common/enums/enums';

const UUID = Joi.object({
  [getNameOf<SLCFunctionLoadParamsDto>('id')]: Joi.string()
    .required()
    .regex(UUIDValidationRule.UUID_PATTERN)
    .messages({
      'string.empty': UUIDValidationMessage.UUID_REQUIRE,
      'string.pattern.base': UUIDValidationMessage.UUID_PATTERN,
    }),
});

export { UUID };

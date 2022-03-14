import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { EAMWorkerCreateRequestDto } from '~/common/types/types';
import {
  EAMWorkerValidationMessage,
  EAMWorkerValidationRule,
} from '~/common/enums/enums';

const eamWorkerCreate = Joi.object({
  [getNameOf<EAMWorkerCreateRequestDto>('name')]: Joi.string()
    .trim()
    .min(EAMWorkerValidationRule.NAME_MIN_LENGTH)
    .max(EAMWorkerValidationRule.NAME_MAX_LENGTH)
    .regex(EAMWorkerValidationRule.NAME_REGEX)
    .ruleset.regex(EAMWorkerValidationRule.NAME_REGEX_FIRST_AND_LAST_CHARTER)
    .rule({
      message: EAMWorkerValidationMessage.NAME_REGEX_FIRST_AND_LAST_CHARTER,
    })
    .required()
    .messages({
      'string.empty': EAMWorkerValidationMessage.NAME_REQUIRE,
      'string.min': EAMWorkerValidationMessage.NAME_LENGTH,
      'string.pattern.base': EAMWorkerValidationMessage.NAME_REGEX,
    }),
});

export { eamWorkerCreate };

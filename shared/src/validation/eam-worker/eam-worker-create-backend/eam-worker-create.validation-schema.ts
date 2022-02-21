import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { EAMWorkerCreateRequestDto } from '~/common/types/types';
import {
  EAMWorkerValidationMessageBackend,
  EAMWorkerValidationRuleBackend,
} from '~/common/enums/enums';

const eamWorkerCreate = Joi.object({
  [getNameOf<EAMWorkerCreateRequestDto>('password')]: Joi.string()
    .trim()
    .required()
    .regex(EAMWorkerValidationRuleBackend.PASSWORD_PATTERN)
    .ruleset.min(EAMWorkerValidationRuleBackend.PASSWORD_MIN_LENGTH)
    .max(EAMWorkerValidationRuleBackend.PASSWORD_MAX_LENGTH)
    .rule({ message: EAMWorkerValidationMessageBackend.PASSWORD_LENGTH })
    .messages({
      'string.empty': EAMWorkerValidationMessageBackend.PASSWORD_REQUIRE,
      'string.pattern.base': EAMWorkerValidationMessageBackend.PASSWORD_LENGTH,
    }),
});

export { eamWorkerCreate };

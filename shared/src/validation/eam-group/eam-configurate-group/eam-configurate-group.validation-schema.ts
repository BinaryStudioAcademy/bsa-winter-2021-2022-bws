import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { EAMGroupCreateRequestDto } from '~/common/types/types';
import {
  EAMGroupValidationMessage,
  EAMGroupValidationRule,
} from '~/common/enums/enums';

const eamGroupConfigurate = Joi.object({
  [getNameOf<EAMGroupCreateRequestDto>('name')]: Joi.string()
    .trim()
    .min(EAMGroupValidationRule.NAME_MIN_LENGTH)
    .max(EAMGroupValidationRule.NAME_MAX_LENGTH)
    .regex(EAMGroupValidationRule.NAME_REGEX)
    .required()
    .messages({
      'string.empty': EAMGroupValidationMessage.NAME_REQUIRE,
      'string.min': EAMGroupValidationMessage.NAME_MIN_LENGTH,
      'string.pattern.base': EAMGroupValidationMessage.NAME_REGEX,
    }),
  [getNameOf<EAMGroupCreateRequestDto>('workersIds')]: Joi.array(),
  [getNameOf<EAMGroupCreateRequestDto>('permissionsIds')]: Joi.array(),
});

export { eamGroupConfigurate };

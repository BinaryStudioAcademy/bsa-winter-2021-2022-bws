import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { EAMGroupCreateRequestDto } from '~/common/types/types';
import {
  EAMGroupValidationMessage,
  EAMGroupValidationRule,
} from '~/common/enums/enums';

const eamGroupUpdate = Joi.object({
  [getNameOf<EAMGroupCreateRequestDto>('name')]: Joi.string()
    .trim()
    .min(EAMGroupValidationRule.NAME_MIN_LENGTH)
    .max(EAMGroupValidationRule.NAME_MAX_LENGTH)
    .regex(EAMGroupValidationRule.NAME_REGEX)
    .messages({
      'string.empty': EAMGroupValidationMessage.NAME_REQUIRE,
      'string.min': EAMGroupValidationMessage.NAME_MIN_LENGTH,
      'string.pattern.base': EAMGroupValidationMessage.NAME_REGEX,
    }),
  [getNameOf<EAMGroupCreateRequestDto>('tenantId')]: Joi.string()
    .trim()
    .required(),
  [getNameOf<EAMGroupCreateRequestDto>('workersIds')]: Joi.array().required(),
  [getNameOf<EAMGroupCreateRequestDto>('permissionsIds')]: Joi.array()
    .required()
    .min(EAMGroupValidationRule.PERMISSION_SELECTED_MIN)
    .messages({
      'array.min': EAMGroupValidationMessage.PERMISSION_SELECTED_MIN,
    }),
});

export { eamGroupUpdate };

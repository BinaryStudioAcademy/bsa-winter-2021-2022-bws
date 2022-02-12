import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { EAMMasterSignUpRequestDto } from '~/common/types/types';
import {
  EAMMasterValidationMessage,
  EAMMasterValidationRule,
} from '~/common/enums/enums';

const eamMasterSignUp = Joi.object({
  [getNameOf<EAMMasterSignUpRequestDto>('email')]: Joi.string()
    .trim()
    .ruleset.email({ tlds: { allow: false } })
    .regex(EAMMasterValidationRule.EMAIL_LOCAL_PART_FIRST_CHARTER)
    .regex(EAMMasterValidationRule.EMAIL_LOCAL_PART_LAST_CHARTER)
    .rule({ message: EAMMasterValidationMessage.EMAIL_NOT_VALID })
    .regex(EAMMasterValidationRule.EMAIL_LENGTH)
    .required()
    .messages({
      'string.empty': EAMMasterValidationMessage.EMAIL_REQUIRE,
      'string.pattern.base': EAMMasterValidationMessage.EMAIL_LENGTH,
    }),
  [getNameOf<EAMMasterSignUpRequestDto>('name')]: Joi.string()
    .trim()
    .ruleset.min(EAMMasterValidationRule.NAME_MIN_LENGTH)
    .max(EAMMasterValidationRule.NAME_MAX_LENGTH)
    .rule({ message: EAMMasterValidationMessage.NAME_LENGTH })
    .ruleset.regex(EAMMasterValidationRule.NAME_FIRST_CHARTER)
    .regex(EAMMasterValidationRule.NAME_LAST_CHARTER)
    .rule({ message: EAMMasterValidationMessage.NAME_FIRST_AND_LAST_CHARTER })
    .regex(EAMMasterValidationRule.NAME_PATTERN)
    .required()
    .messages({
      'string.empty': EAMMasterValidationMessage.NAME_REQUIRE,
      'string.pattern.base': EAMMasterValidationMessage.NAME_PATTERN,
    }),
  [getNameOf<EAMMasterSignUpRequestDto>('password')]: Joi.string()
    .trim()
    .ruleset.min(EAMMasterValidationRule.PASSWORD_MIN_LENGTH)
    .max(EAMMasterValidationRule.PASSWORD_MAX_LENGTH)
    .rule({ message: EAMMasterValidationMessage.PASSWORD_LENGTH })
    .regex(EAMMasterValidationRule.PASSWORD_PATTERN)
    .required()
    .messages({
      'string.empty': EAMMasterValidationMessage.PASSWORD_REQUIRE,
      'string.pattern.base': EAMMasterValidationMessage.PASSWORD_PATTERN,
    }),
});

export { eamMasterSignUp };

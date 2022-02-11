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
    .email({ tlds: { allow: false } })
    .pattern(EAMMasterValidationRule.EMAIL_LENGTH)
    .pattern(EAMMasterValidationRule.EMAIL_LOCAL_PART_FIRST_CHARTER, {
      name: 'localPart',
    })
    .pattern(EAMMasterValidationRule.EMAIL_LOCAL_PART_LAST_CHARTER, {
      name: 'localPart',
    })
    .required()
    .messages({
      'string.email': EAMMasterValidationMessage.EMAIL_WRONG,
      'string.empty': EAMMasterValidationMessage.EMAIL_REQUIRE,
      'string.pattern.base': EAMMasterValidationMessage.EMAIL_LENGTH,
      'string.pattern.name':
        EAMMasterValidationMessage.NAME_FIRST_AND_LAST_CHARTER,
    }),
  [getNameOf<EAMMasterSignUpRequestDto>('name')]: Joi.string()
    .trim()
    .min(EAMMasterValidationRule.NAME_MIN_LENGTH)
    .max(EAMMasterValidationRule.NAME_MAX_LENGTH)
    .pattern(EAMMasterValidationRule.NAME_PATTERN)
    .pattern(EAMMasterValidationRule.NAME_FIRST_CHARTER, {
      name: 'firstAndLastCharacter',
    })
    .pattern(EAMMasterValidationRule.NAME_LAST_CHARTER, {
      name: 'firstAndLastCharacter',
    })
    .required()
    .messages({
      'string.empty': EAMMasterValidationMessage.NAME_REQUIRE,
      'string.min': EAMMasterValidationMessage.NAME_MIN_LENGTH,
      'string.max': EAMMasterValidationMessage.NAME_MAX_LENGTH,
      'string.pattern.base': EAMMasterValidationMessage.NAME_PATTERN,
      'string.pattern.name':
        EAMMasterValidationMessage.NAME_FIRST_AND_LAST_CHARTER,
    }),
  [getNameOf<EAMMasterSignUpRequestDto>('password')]: Joi.string()
    .trim()
    .min(EAMMasterValidationRule.PASSWORD_MIN_LENGTH)
    .max(EAMMasterValidationRule.PASSWORD_MAX_LENGTH)
    .pattern(EAMMasterValidationRule.PASSWORD_PATTERN)
    .required()
    .messages({
      'string.empty': EAMMasterValidationMessage.PASSWORD_REQUIRE,
      'string.min': EAMMasterValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': EAMMasterValidationMessage.PASSWORD_MAX_LENGTH,
      'string.pattern.base': EAMMasterValidationMessage.PASSWORD_PATTERN,
    }),
});

export { eamMasterSignUp };

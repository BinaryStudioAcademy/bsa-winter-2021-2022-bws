import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { MasterSignUpRequestDto } from '~/common/types/types';
import {
  MasterValidationMessage,
  MasterSignUpValidationRule,
} from '~/common/enums/enums';

const masterSignUp = Joi.object({
  [getNameOf<MasterSignUpRequestDto>('email')]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .pattern(MasterSignUpValidationRule.EMAIL_LENGTH)
    .pattern(MasterSignUpValidationRule.EMAIL_LOCAL_PART_FIRST_CHARTER, {
      name: 'localPart',
    })
    .pattern(MasterSignUpValidationRule.EMAIL_LOCAL_PART_LAST_CHARTER, {
      name: 'localPart',
    })
    .required()
    .messages({
      'string.email': MasterValidationMessage.EMAIL_WRONG,
      'string.empty': MasterValidationMessage.EMAIL_REQUIRE,
      'string.pattern.base': MasterValidationMessage.EMAIL_LENGTH,
      'string.pattern.name':
        MasterValidationMessage.NAME_FIRST_AND_LAST_CHARTER,
    }),
  [getNameOf<MasterSignUpRequestDto>('name')]: Joi.string()
    .trim()
    .min(MasterSignUpValidationRule.NAME_MIN_LENGTH)
    .max(MasterSignUpValidationRule.NAME_MAX_LENGTH)
    .pattern(MasterSignUpValidationRule.NAME_PATTERN)
    .pattern(MasterSignUpValidationRule.NAME_FIRST_CHARTER, {
      name: 'firstAndLastCharacter',
    })
    .pattern(MasterSignUpValidationRule.NAME_LAST_CHARTER, {
      name: 'firstAndLastCharacter',
    })
    .required()
    .messages({
      'string.empty': MasterValidationMessage.NAME_REQUIRE,
      'string.min': MasterValidationMessage.NAME_MIN_LENGTH,
      'string.max': MasterValidationMessage.NAME_MAX_LENGTH,
      'string.pattern.base': MasterValidationMessage.NAME_PATTERN,
      'string.pattern.name':
        MasterValidationMessage.NAME_FIRST_AND_LAST_CHARTER,
    }),
  [getNameOf<MasterSignUpRequestDto>('password')]: Joi.string()
    .trim()
    .min(MasterSignUpValidationRule.PASSWORD_MIN_LENGTH)
    .max(MasterSignUpValidationRule.PASSWORD_MAX_LENGTH)
    .pattern(MasterSignUpValidationRule.PASSWORD_PATTERN)
    .required()
    .messages({
      'string.empty': MasterValidationMessage.PASSWORD_REQUIRE,
      'string.min': MasterValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': MasterValidationMessage.PASSWORD_MAX_LENGTH,
      'string.pattern.base': MasterValidationMessage.PASSWORD_PATTERN,
    }),
});

export { masterSignUp };

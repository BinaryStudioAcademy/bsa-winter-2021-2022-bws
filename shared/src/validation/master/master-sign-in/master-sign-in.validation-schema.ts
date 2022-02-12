import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { MasterSignInRequestDto } from '~/common/types/types';
import {
  MasterValidationMessage,
  MasterSignInValidationRule,
} from '~/common/enums/enums';

const masterSignIn = Joi.object({
  [getNameOf<MasterSignInRequestDto>('email')]: Joi.string()
    .trim()
    .email()
    .pattern(MasterSignInValidationRule.EMAIL_LENGTH)
    .pattern(MasterSignInValidationRule.EMAIL_LOCAL_PART_CHARTER, {
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
  [getNameOf<MasterSignInRequestDto>('password')]: Joi.string()
    .trim()
    .min(MasterSignInValidationRule.PASSWORD_MIN_LENGTH)
    .max(MasterSignInValidationRule.PASSWORD_MAX_LENGTH)
    .pattern(MasterSignInValidationRule.PASSWORD_PATTERN)
    .required()
    .messages({
      'string.empty': MasterValidationMessage.PASSWORD_REQUIRE,
      'string.min': MasterValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': MasterValidationMessage.PASSWORD_MAX_LENGTH,
      'string.pattern.base': MasterValidationMessage.PASSWORD_PATTERN,
    }),
});

export { masterSignIn };

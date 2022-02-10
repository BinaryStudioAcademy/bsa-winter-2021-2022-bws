import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { MasterSignInRequestDto } from '~/common/types/types';
import { MasterValidationMessage } from '~/common/enums/enums';

const masterSignIn = Joi.object({
  [getNameOf<MasterSignInRequestDto>('email')]: Joi.string()
    .trim()
    .required()
    .messages({
      'string.email': MasterValidationMessage.EMAIL_WRONG,
      'string.empty': MasterValidationMessage.EMAIL_REQUIRE,
    }),
  [getNameOf<MasterSignInRequestDto>('password')]: Joi.string()
    .trim()
    .required(),
});

export { masterSignIn };

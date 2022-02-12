import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { EAMMasterSignInRequestDto } from '~/common/types/types';
import { EAMMasterValidationMessage } from '~/common/enums/enums';

const eamMasterSignIn = Joi.object({
  [getNameOf<EAMMasterSignInRequestDto>('email')]: Joi.string()
    .trim()
    .required()
    .messages({
      'string.email': EAMMasterValidationMessage.EMAIL_NOT_VALID,
      'string.empty': EAMMasterValidationMessage.EMAIL_REQUIRE,
    }),
  [getNameOf<EAMMasterSignInRequestDto>('password')]: Joi.string()
    .trim()
    .required(),
});

export { eamMasterSignIn };

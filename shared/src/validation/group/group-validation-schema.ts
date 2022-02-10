import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { GroupDto } from '~/common/types/types';
import { GroupValidationMessage } from '~/common/enums/enums';

const group = Joi.object({
  [getNameOf<GroupDto>('name')]: Joi.string()
    .trim()
    .required()

    .messages({
      'string.empty': GroupValidationMessage.NAME_REQUIRE,
      'string.min': GroupValidationMessage.NAME_MIN_LENGTH,
      'string.max': GroupValidationMessage.NAME_MAX_LENGTH,
    }),
});

export { group };

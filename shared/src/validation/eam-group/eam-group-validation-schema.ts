import * as Joi from 'joi';
import { getNameOf } from '~/helpers/helpers';
import { EAMGroupCreateRequestDto } from '~/common/types/types';
import { EAMGroupValidationMessage } from '~/common/enums/enums';

const eamGroup = Joi.object({
  [getNameOf<EAMGroupCreateRequestDto>('name')]: Joi.string()
    .trim()
    .required()

    .messages({
      'string.empty': EAMGroupValidationMessage.NAME_REQUIRE,
      'string.min': EAMGroupValidationMessage.NAME_MIN_LENGTH,
      'string.max': EAMGroupValidationMessage.NAME_MAX_LENGTH,
    }),
});

export { eamGroup };

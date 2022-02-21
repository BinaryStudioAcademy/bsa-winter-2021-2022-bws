import { BSSpaceValidationRule } from './bs-space-validation-rule.enum';

const BSSpaceValidationMessage = {
  NAME_REQUIRE: 'Space name is required',
  NAME_LENGTH: `Space name must have a minimum of ${BSSpaceValidationRule.NAME_MIN_LENGTH} characters and a maximum of ${BSSpaceValidationRule.NAME_MAX_LENGTH} characters.`,
  NAME_REGEX: 'Space name can contain only lowercase latin letters',
} as const;

export { BSSpaceValidationMessage };

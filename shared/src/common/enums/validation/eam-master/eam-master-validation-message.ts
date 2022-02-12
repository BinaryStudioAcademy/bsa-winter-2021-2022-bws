import { EAMMasterValidationRule } from './eam-master-validation-rule.enum';

const EAMMasterValidationMessage = {
  EMAIL_REQUIRE: 'Email is required',
  EMAIL_NOT_VALID: 'The email format is not valid',
  EMAIL_LENGTH: 'You have exceeded the character limit',
  NAME_REQUIRE: 'Name is required',
  NAME_LENGTH: `Name must have a minimum of ${EAMMasterValidationRule.NAME_MIN_LENGTH} characters and a maximum of
    ${EAMMasterValidationRule.NAME_MAX_LENGTH} characters`,
  NAME_PATTERN: 'Name can contain latin letters, digits, hyphen or dot',
  NAME_FIRST_AND_LAST_CHARTER:
    'Name must starts and ends with a letter or a digit',
  PASSWORD_REQUIRE: 'Password is required',
  PASSWORD_LENGTH: `Password must have a minimum of ${EAMMasterValidationRule.PASSWORD_MIN_LENGTH} characters
    and a maximum of ${EAMMasterValidationRule.PASSWORD_MAX_LENGTH} characters`,
  PASSWORD_PATTERN: 'Spaces are not allowed in a password',
} as const;

export { EAMMasterValidationMessage };

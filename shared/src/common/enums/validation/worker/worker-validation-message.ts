import { EAMWorkerValidationRule } from './create-worker-validation-rule.enum';
const EAMWorkerValidationMessage = {
  NAME_REQUIRE: 'User cannot create a new user without any name',
  NAME_MIN_LENGTH: `Name must have at least ${EAMWorkerValidationRule.NAME_MIN_LENGTH} characters`,
  NAME_MAX_LEGTH: `Name must be less than  ${EAMWorkerValidationRule.NAME_MAX_LENGTH} characters`,
  NAME_REGEX:
    'Name must start and end with a letter (allowed symbols "_", ".")',
  PASSWORD_REQUIRE: 'Password is required',
  PASSWORD_LENGTH: `Password must have a minimum of ${EAMWorkerValidationRule.PASSWORD_MIN_LENGTH} characters
    and a maximum of ${EAMWorkerValidationRule.PASSWORD_MAX_LENGTH} characters`,
  PASSWORD_PATTERN:
    'Password can contain latin letters, digits and special characters',
} as const;

export { EAMWorkerValidationMessage };

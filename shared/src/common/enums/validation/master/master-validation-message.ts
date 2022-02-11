import { MasterSignUpValidationRule } from './master-sign-up-validation-rule.enum';

const MasterValidationMessage = {
  EMAIL_REQUIRE: 'Email is required',
  EMAIL_WRONG: 'Email is wrong',
  EMAIL_LENGTH: 'Wrong email length',
  EMAIL_LOCAL_PART:
    'Email local part must starts and ends with a letter or a digit',
  NAME_REQUIRE: 'Name is required',
  NAME_MIN_LENGTH: `Name must be at least ${MasterSignUpValidationRule.NAME_MIN_LENGTH} characters`,
  NAME_MAX_LENGTH: `Name must be at most ${MasterSignUpValidationRule.NAME_MAX_LENGTH} characters`,
  NAME_PATTERN: 'Name can contains letters, digits, hyphen or dot',
  NAME_FIRST_AND_LAST_CHARTER:
    'Name must starts and ends with a letter or a digit',
  PASSWORD_REQUIRE: 'Password is required',
  PASSWORD_MIN_LENGTH: `Password must be at least ${MasterSignUpValidationRule.PASSWORD_MIN_LENGTH} characters`,
  PASSWORD_MAX_LENGTH: `Password must be at most ${MasterSignUpValidationRule.PASSWORD_MAX_LENGTH} characters`,
  PASSWORD_PATTERN: 'Spaces aren not allow in a password',
} as const;

export { MasterValidationMessage };

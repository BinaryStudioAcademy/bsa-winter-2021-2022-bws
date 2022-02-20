import { SCInstanceValidationRule } from './sc-instance-validation-rule.enum';

const SCInstanceValidationMessage = {
  NAME_REQUIRE: 'Instance name is required',
  NAME_LENGTH: `Instance name must have a minimum of ${SCInstanceValidationRule.NAME_MIN_LENGTH} characters and a maximum of ${SCInstanceValidationRule.NAME_MAX_LENGTH} characters.`,
  NAME_PATTERN: 'Instance name can contain only latin letters and digits',
  OPERATION_SYSTEM_REQUIRE: 'Operation system is required',
} as const;

export { SCInstanceValidationMessage };

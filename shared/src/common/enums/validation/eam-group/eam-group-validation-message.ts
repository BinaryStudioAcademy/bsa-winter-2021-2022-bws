import { EAMGroupValidationRule } from './eam-group-validation-rule.enum';
const EAMGroupValidationMessage = {
  NAME_REQUIRE: 'Name is required',
  NAME_MAX_LENGTH: `Name must be less than  ${EAMGroupValidationRule.NAME_MAX_LENGTH} characters`,
  NAME_MIN_LENGTH: `Name must have at least ${EAMGroupValidationRule.NAME_MIN_LENGTH} characters`,
  NAME_REGEX:
    'Name must start and end with a letter (allowed symbols "_", ".")',
} as const;

export { EAMGroupValidationMessage };

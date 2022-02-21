import { EAMWorkerValidationRule } from './create-worker-validation-rule.enum';
const EAMWorkerValidationMessage = {
  NAME_REQUIRE: 'Worker name is required',
  NAME_MIN_LENGTH: `Worker name must have a minimum of ${EAMWorkerValidationRule.NAME_MIN_LENGTH} and a maximum of ${EAMWorkerValidationRule.NAME_MAX_LENGTH} characters`,
  NAME_MAX_LENGTH: `Worker name must have a minimum of ${EAMWorkerValidationRule.NAME_MIN_LENGTH} and a maximum of ${EAMWorkerValidationRule.NAME_MAX_LENGTH} characters`,
  NAME_REGEX: 'Worker name can contain latin letters, digits, hyphen or dot',
} as const;

export { EAMWorkerValidationMessage };

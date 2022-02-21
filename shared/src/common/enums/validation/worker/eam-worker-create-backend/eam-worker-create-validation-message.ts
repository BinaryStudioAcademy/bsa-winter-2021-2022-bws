import { EAMWorkerValidationRuleBackend } from './eam-worker-create-validation-rule.enum';
const EAMWorkerValidationMessageBackend = {
  PASSWORD_REQUIRE: 'Password is required',
  PASSWORD_LENGTH: `Password must have a minimum of ${EAMWorkerValidationRuleBackend.PASSWORD_MIN_LENGTH} characters
    and a maximum of ${EAMWorkerValidationRuleBackend.PASSWORD_MAX_LENGTH} characters`,
  PASSWORD_PATTERN:
    'Password can contain latin letters, digits and special characters',
} as const;

export { EAMWorkerValidationMessageBackend };

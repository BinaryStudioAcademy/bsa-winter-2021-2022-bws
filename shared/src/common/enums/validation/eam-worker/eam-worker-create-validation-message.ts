import { EAMWorkerValidationRule } from './eam-worker-create-validation-rule.enum';
const EAMWorkerValidationMessage = {
  NAME_REQUIRE: 'Worker name is required',
  NAME_LENGTH: `Worker name must have a minimum of ${EAMWorkerValidationRule.NAME_MIN_LENGTH} and a maximum of ${EAMWorkerValidationRule.NAME_MAX_LENGTH} characters`,
  NAME_REGEX: 'Worker name can contain latin letters, digits, hyphen or dot',
  NAME_REGEX_FIRST_AND_LAST_CHARTER:
    'Worker name must starts and ends with a letter or digits',
  TENANT_NAME_REQUIRE: 'Tenant name is required',
  TENANT_NAME_MIN_LENGTH: `Tenant name must have a minimum of ${EAMWorkerValidationRule.TENANT_NAME_MIN_LENGTH} and a maximum of ${EAMWorkerValidationRule.TENANT_NAME_MAX_LENGTH} characters`,
  TENANT_NAME_MAX_LENGTH: `Tenant name must have a minimum of ${EAMWorkerValidationRule.TENANT_NAME_MIN_LENGTH} and a maximum of ${EAMWorkerValidationRule.TENANT_NAME_MAX_LENGTH} characters`,
  TENANT_NAME_PATTERN: 'Tenant name can contain latin letters only',
  PASSWORD_REQUIRE: 'Password is required',
  PASSWORD_LENGTH: `Password must have a minimum of ${EAMWorkerValidationRule.PASSWORD_MIN_LENGTH} characters
    and a maximum of ${EAMWorkerValidationRule.PASSWORD_MAX_LENGTH} characters`,
  PASSWORD_PATTERN:
    'Password can contain latin letters, digits and special characters',
  GROUPIDS_REQUIRE: 'Please select any group or create a new one first',
} as const;

export { EAMWorkerValidationMessage };

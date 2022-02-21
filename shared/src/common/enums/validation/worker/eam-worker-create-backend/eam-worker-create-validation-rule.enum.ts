const EAMWorkerValidationRuleBackend = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 16,
  PASSWORD_PATTERN: /^[a-zA-Z0-9\-.@!#$%&'*+-/=?^_`|]+$/,
} as const;

export { EAMWorkerValidationRuleBackend };

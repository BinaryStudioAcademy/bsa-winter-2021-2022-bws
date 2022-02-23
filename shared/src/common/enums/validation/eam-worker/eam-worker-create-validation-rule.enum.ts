const EAMWorkerValidationRule = {
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 20,
  NAME_REGEX: /^[a-zA-Z\d][a-zA-Z\d-.]+[a-zA-Z\d]$/,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 40,
  PASSWORD_PATTERN: /^[a-zA-Z0-9\-.@!#$%&'*+-/=?^_`|]+$/,
} as const;

export { EAMWorkerValidationRule };
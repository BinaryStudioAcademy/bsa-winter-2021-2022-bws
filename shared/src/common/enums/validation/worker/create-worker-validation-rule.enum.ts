const EAMWorkerValidationRule = {
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 20,
  NAME_REGEX: /^[a-zA-Z\d][a-zA-Z\d-.]+[a-zA-Z\d]$/,
} as const;

export { EAMWorkerValidationRule };

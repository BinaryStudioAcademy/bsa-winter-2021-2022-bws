const SCInstanceValidationRule = {
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 20,
  NAME_PATTERN: /^[a-zA-Z0-9]+$/,
} as const;

export { SCInstanceValidationRule };

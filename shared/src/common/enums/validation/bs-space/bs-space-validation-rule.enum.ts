const BSSpaceValidationRule = {
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 20,
  NAME_REGEX: /^[a-z]+$/,
} as const;

export { BSSpaceValidationRule };

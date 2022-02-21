const EAMGroupValidationRule = {
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 20,
  NAME_REGEX: /^[a-zA-Z\d][a-zA-Z\d_.]+[a-zA-Z\d]$/,
  PERMISSION_SELECTED_MIN: 1,
} as const;

export { EAMGroupValidationRule };

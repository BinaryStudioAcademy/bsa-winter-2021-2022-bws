const MasterSignUpValidationRule = {
  EMAIL_LOCAL_PART_FIRST_CHARTER: /^[a-zA-Z0-9].+$/,
  EMAIL_LOCAL_PART_LAST_CHARTER: /[a-zA-Z0-9]@/,
  EMAIL_LENGTH: /^[\S]{1,35}@[\S]{1,35}$/,
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 20,
  NAME_FIRST_CHARTER: /^[a-zA-Z0-9].+$/,
  NAME_LAST_CHARTER: /[a-zA-Z0-9]$/,
  NAME_PATTERN: /^[a-zA-Z0-9\-.]+$/,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 16,
  PASSWORD_PATTERN: /^\S+$/,
} as const;

export { MasterSignUpValidationRule };

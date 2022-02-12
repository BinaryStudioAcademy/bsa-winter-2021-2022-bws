const MasterSignInValidationRule = {
  EMAIL_LOCAL_PART_CHARTER: /^[a-zA-Z0-9]+$/,
  EMAIL_LENGTH: /^[\S]{1,35}@[\S]{1,35}$/,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 16,
  PASSWORD_PATTERN: /^\S+$/,
} as const;

export { MasterSignInValidationRule };

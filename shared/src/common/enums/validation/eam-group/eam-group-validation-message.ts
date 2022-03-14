const EAMGroupValidationMessage = {
  NAME_REQUIRE: 'Group name is required',
  NAME_MIN_LENGTH:
    'Group name must have a minimum of 3 characters and a maximum of 20 characters',
  NAME_MAX_LENGTH:
    'Group name must have a minimum of 3 characters and a maximum of 20 characters',
  NAME_REGEX: 'Group name can contain latin letters, digits, hyphen or dot',
  PERMISSION_SELECTED_MIN:
    'User can not create a group without any permissions for it',
} as const;

export { EAMGroupValidationMessage };

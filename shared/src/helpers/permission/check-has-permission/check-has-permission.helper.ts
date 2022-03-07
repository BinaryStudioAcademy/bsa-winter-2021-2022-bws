const checkHasPermission = (
  pagePermissions: string[],
  userPermissions: string[],
): boolean => {
  return pagePermissions.every((pagePermission) => {
    return userPermissions.some(
      (userPermission) => userPermission === pagePermission,
    );
  });
};

export { checkHasPermission };

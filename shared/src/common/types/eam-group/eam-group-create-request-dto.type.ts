type EAMGroupCreateRequestDto = {
  name: string;
  tenantId: string;
  workersIds: string[];
  permissionsIds: string[];
};

export { type EAMGroupCreateRequestDto };

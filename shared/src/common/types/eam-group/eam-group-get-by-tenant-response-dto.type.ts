import { EAMGroupGetByTenantResponseItemDto } from './eam-group-get-by-tenant-response-item-dto.type';

type EAMGroupGetByTenantResponseDto = {
  items: EAMGroupGetByTenantResponseItemDto[];
  count: number;
};

export { type EAMGroupGetByTenantResponseDto };

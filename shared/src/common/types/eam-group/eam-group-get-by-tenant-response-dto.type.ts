import { EAMGroupGetByTenantResponseItemDto } from './eam-group-get-by-tenant-response-item-dto.type';

type EAMGroupGetByTenantResponseDto = {
  items: EAMGroupGetByTenantResponseItemDto[];
  itemsCount: number;
};

export { type EAMGroupGetByTenantResponseDto };

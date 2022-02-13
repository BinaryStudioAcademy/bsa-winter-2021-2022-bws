import { EAMGroupCreateResponseDto } from 'common/types/types';

const DEFAULT_GROUP_PAYLOAD: EAMGroupCreateResponseDto = {
  id: '',
  name: '',
  createdAt: new Date(),
  tenantId: '',
};

export { DEFAULT_GROUP_PAYLOAD };

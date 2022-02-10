import { GroupDto } from 'common/types/types';

const DEFAULT_GROUP_PAYLOAD: GroupDto = {
  id: '',
  name: '',
  createdAt: new Date(),
  tenant_id: '',
};

export { DEFAULT_GROUP_PAYLOAD };

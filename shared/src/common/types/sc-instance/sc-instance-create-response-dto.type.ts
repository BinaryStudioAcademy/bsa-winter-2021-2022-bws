import { InstanceState } from '~/common/enums/enums';
import { SCInstanceRelatedItem } from './sc-instance-related-item.type';

type SCInstanceCreateResponseDto = {
  name: string;
  id: string;
  awsInstanceId: string;
  instanceType: string;
  createdAt: string;
  publicIpAddress: null;
  keyPairId: string;
  state: InstanceState;
  operationSystem: SCInstanceRelatedItem;
};

export { type SCInstanceCreateResponseDto };

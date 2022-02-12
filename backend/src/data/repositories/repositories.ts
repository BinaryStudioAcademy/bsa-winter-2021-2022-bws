import {
  Master as MasterModel,
  Tenant as TenantModel,
  Group as GroupModel,
} from '~/data/models/models';
import { Master } from './master/master.repository';
import { Tenant } from './tenant/tenant.repository';
import { Group } from './group/group.repository';

const master = new Master({
  MasterModel,
});

const tenant = new Tenant({
  TenantModel,
});

const group = new Group({
  GroupModel,
});

export { master, group, tenant };

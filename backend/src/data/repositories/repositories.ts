import { Master } from './master/master.repository';
import { Group } from './group/group.repository';
import { Tenant } from './tenant/tenant.repository';
import {
  Master as MasterModel,
  Group as GroupModel,
  Tenant as TenantModel,
} from '~/data/models/models';

const master = new Master({
  MasterModel,
});

const group = new Group({
  GroupModel,
});

const tenant = new Tenant({
  TenantModel,
});

export { master, group, tenant };

import {
  Master as MasterModel,
  Tenant as TenantModel,
  Worker as WorkerModel,
  Group as GroupModel,
  UsersGroups as UsersGroupsModel,
  Instance as InstanceModel,
  KeyPair as KeyPairModel,
  OperationSystem as OperationSystemModel,
  Space as SpaceModel,
  Permission as PermissionModel,
  GroupsPermissions as GroupsPermissionsModel,
  SLCFunction as SLCFunctionModel,
  BSObject as BSObjectModel,
} from '~/data/models/models';
import { Master } from './master/master.repository';
import { Tenant } from './tenant/tenant.repository';
import { Worker } from './worker/worker.repository';
import { Group } from './group/group.repository';
import { Instance } from './instance/instance.repository';
import { KeyPair } from './key-pair/key-pair.repository';
import { OperationSystem } from './operation-system/operation-system.repository';
import { Space } from './space/space.repository';
import { Permission } from './permission/permission.repository';
import { SLCFunction } from './slc-function/slc-function.repository';
import { BSObject } from './bs-object/bs-object.repository';

const master = new Master({
  MasterModel,
  PermissionModel,
});

const tenant = new Tenant({
  TenantModel,
});

const worker = new Worker({
  WorkerModel,
  UsersGroupsModel,
  GroupsPermissionsModel,
  PermissionModel,
});

const group = new Group({
  GroupModel,
  UsersGroupsModel,
  GroupsPermissionsModel,
});

const permission = new Permission({
  PermissionModel,
});

const space = new Space({
  SpaceModel,
});

const instance = new Instance({
  InstanceModel,
});

const keyPair = new KeyPair({
  KeyPairModel,
});

const operationSystem = new OperationSystem({
  OperationSystemModel,
});

const slcFunction = new SLCFunction({
  SLCFunctionModel,
});

const bsObject = new BSObject({
  BSObjectModel,
});

export {
  master,
  group,
  tenant,
  worker,
  space,
  permission,
  instance,
  keyPair,
  operationSystem,
  slcFunction,
  bsObject,
};

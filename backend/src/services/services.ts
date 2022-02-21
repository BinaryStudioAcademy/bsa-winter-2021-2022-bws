import { ENV } from '~/common/enums/enums';
import { MASTER_PASSWORD_SALT_ROUNDS } from '~/common/constants/master.constants';
import {
  master as masterRepository,
  tenant as tenantRepository,
  worker as workerRepository,
  group as groupRepository,
  keyPair as keyPairRepository,
  instance as instanceRepository,
  operationSystem as operationSystemRepository,
  permission as permissionRepository,
  space as spaceRepository,
} from '~/data/repositories/repositories';
import { Master } from './master/master.service';
import { Group } from './group/group.service';
import { Encrypt } from './encrypt/encrypt.service';
import { Token } from './token/token.service';
import { Tenant } from './tenant/tenant.service';
import { Worker } from './worker/worker.service';
import { Auth } from './auth/auth.service';
import { EC2 } from './aws/ec2/ec2.service';
import { KeyPair } from './key-pair/key-pair.service';
import { Instance } from './instance/instance.service';
import { Space } from './space/space.service';
import { S3 } from './aws/s3/s3.service';
import { Permission } from './permission/permission.service';

const token = new Token();
const encrypt = new Encrypt({
  salt: MASTER_PASSWORD_SALT_ROUNDS,
});

const tenant = new Tenant({
  tenantRepository,
});

const master = new Master({
  masterRepository,
  tokenService: token,
  encryptService: encrypt,
  tenantService: tenant,
});

const worker = new Worker({
  workerRepository,
  encryptService: encrypt,
  tokenService: token,
  masterService: master,
  tenantService: tenant,
});

const group = new Group({
  groupRepository,
});

const auth = new Auth({
  masterService: master,
  workerService: worker,
  tokenService: token,
});

const ec2 = new EC2({
  region: ENV.AWS.REGION,
  credentials: {
    accessKeyId: ENV.AWS.ACCESS_KEY,
    secretAccessKey: ENV.AWS.SECRET_KEY,
  },
});

const keyPair = new KeyPair({
  keyPairRepository,
  ec2Service: ec2,
});

const instance = new Instance({
  instanceRepository,
  operationSystemRepository,
  keyPairService: keyPair,
  ec2Service: ec2,
  tokenService: token,
});

const permission = new Permission({
  permissionRepository,
});

const s3 = new S3({
  region: ENV.AWS.REGION,
  credentials: {
    accessKeyId: ENV.AWS.ACCESS_KEY,
    secretAccessKey: ENV.AWS.SECRET_KEY,
  },
});

const space = new Space({
  spaceRepository,
  tokenService: token,
  s3Service: s3,
});

export {
  master,
  encrypt,
  token,
  tenant,
  worker,
  group,
  auth,
  ec2,
  keyPair,
  instance,
  space,
  s3,
  permission,
};

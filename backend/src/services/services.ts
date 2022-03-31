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
  slcFunction as slcFunctionRepository,
  bsObject as bsObjectRepository,
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
import { OperationSystem } from './operation-system/operation-system.service';
import { BSObject } from './bs-object/bs-object.service';
import { Instance } from './instance/instance.service';
import { Space } from './space/space.service';
import { S3 } from './aws/s3/s3.service';
import { Permission } from './permission/permission.service';
import { Lambda } from './aws/lambda/lambda.service';
import { SLCFunction } from './slc-function/slc-function.service';
import { BackgroundJob } from '~/services/background/background-job';

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

const lambda = new Lambda({
  region: ENV.AWS.REGION,
  credentials: {
    accessKeyId: ENV.AWS.ACCESS_KEY,
    secretAccessKey: ENV.AWS.SECRET_KEY,
  },
  role: ENV.AWS.LAMBDA_ROLE,
});

const slcFunction = new SLCFunction({
  slcFunctionRepository,
  tokenService: token,
  lambdaService: lambda,
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

const operationSystem = new OperationSystem({
  operationSystemRepository,
});

const instance = new Instance({
  instanceRepository,
  operationSystemService: operationSystem,
  keyPairService: keyPair,
  ec2Service: ec2,
  tokenService: token,
});

const worker = new Worker({
  workerRepository,
  tenantRepository,
  spaceRepository,
  slcFunctionRepository,
  instanceRepository,
  encryptService: encrypt,
  tokenService: token,
  instanceService: instance,
  spaceService: space,
  slcFunctionService: slcFunction,
});

const group = new Group({
  groupRepository,
});

const auth = new Auth({
  masterService: master,
  workerService: worker,
  tokenService: token,
});

const permission = new Permission({
  permissionRepository,
});

const backgroundJob = new BackgroundJob({
  flags: ENV.FLAGS,
  instanceService: instance,
  instanceRepository,
  ec2Service: ec2,
});
const bsObject = new BSObject({
  bsObjectRepository,
  s3Service: s3,
  workerService: worker,
  tokenService: token,
  spaceService: space,
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
  operationSystem,
  instance,
  space,
  s3,
  permission,
  lambda,
  slcFunction,
  backgroundJob,
  bsObject,
};

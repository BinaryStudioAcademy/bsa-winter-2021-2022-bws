import { MASTER_PASSWORD_SALT_ROUNDS } from '~/common/constants/master.constants';
import {
  master as masterRepository,
  tenant as tenantRepository,
  worker as workerRepository,
  group as groupRepository,
} from '~/data/repositories/repositories';
import { Master } from './master/master.service';
import { Group } from '~/services/group/group.service';
import { Encrypt } from './encrypt/encrypt.service';
import { Token } from './token/token.service';
import { Tenant } from './tenant/tenant.service';
import { Worker } from './worker/worker.service';
import { Auth } from './auth/auth.service';

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

export { master, encrypt, token, tenant, worker, group, auth };

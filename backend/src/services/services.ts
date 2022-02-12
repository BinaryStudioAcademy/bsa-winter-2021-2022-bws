import { MASTER_PASSWORD_SALT_ROUNDS } from '~/common/constants/master.constants';
import {
  master as masterRepository,
  tenant as tenantRepository,
  group as groupRepository,
} from '~/data/repositories/repositories';
import { Master } from './master/master.service';
import { Group } from '~/services/group/group.service';
import { Encrypt } from './encrypt/encrypt.service';
import { Token } from './token/token.service';
import { Tenant } from './tenant/tenant.service';

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

const group = new Group({
  groupRepository,
});

export { master, group, token, encrypt, tenant };

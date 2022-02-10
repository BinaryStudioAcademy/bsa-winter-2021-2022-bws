import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { TenantTableField } from './tenant-table-field.enum';

class Tenant extends AbstractModel {
  [TenantTableField.NAME]: string;

  static get tableName(): string {
    return TableName.TENANTS;
  }
}

export { Tenant };

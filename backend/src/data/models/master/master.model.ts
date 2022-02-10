import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { MasterTableField } from './master-table-field.enum';

class Master extends AbstractModel {
  [MasterTableField.NAME]: string;
  [MasterTableField.EMAIL]: string;
  [MasterTableField.PASSWORD_HASH]: string;
  [MasterTableField.PASSWORD_SALT]: string;
  [MasterTableField.TENANT_ID]: string;

  static get tableName(): string {
    return TableName.MASTERS;
  }
}

export { Master };

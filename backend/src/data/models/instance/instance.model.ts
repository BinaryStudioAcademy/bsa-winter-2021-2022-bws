import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { InstanceTableField } from './instance-table-field.enum';

class Instance extends AbstractModel {
  [InstanceTableField.NAME]: string;
  [InstanceTableField.KEY_PAIRS_ID]: string;
  [InstanceTableField.USERNAME]: string;
  [InstanceTableField.HOSTNAME]: string;
  [InstanceTableField.OPERATION_SYSTEM_ID]: string;
  [InstanceTableField.CREATED_BY]: string;
  [InstanceTableField.AWS_INSTANCE_ID]: string;
  [InstanceTableField.TENANT_ID]: string;

  static get tableName(): string {
    return TableName.INSTANCES;
  }
}

export { Instance };

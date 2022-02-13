import { AbstractModel } from '~/data/models/abstract/abstract.model';
import { WorkerTableField } from '~/data/models/worker/worker-table-field.enum';
import { TableName } from '~/common/enums/db/table-name.enum';

class Worker extends AbstractModel {
  [WorkerTableField.NAME]: string;
  [WorkerTableField.PASSWORD_HASH]: string;
  [WorkerTableField.PASSWORD_SALT]: string;
  [WorkerTableField.TENANT_ID]: string;

  static get tableName(): string {
    return TableName.WORKERS;
  }
}

export { Worker };

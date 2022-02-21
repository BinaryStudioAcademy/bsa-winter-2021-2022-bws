import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { OperationSystemTableField } from './operation-system-table-field.enum';

class OperationSystem extends AbstractModel {
  [OperationSystemTableField.NAME]: string;
  [OperationSystemTableField.AWS_GENERATION_NAME]: string;

  static get tableName(): string {
    return TableName.OPERATION_SYSTEMS;
  }
}

export { OperationSystem };

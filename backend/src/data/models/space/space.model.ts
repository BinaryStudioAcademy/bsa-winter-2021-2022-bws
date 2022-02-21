import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { SpaceTableField } from '~/data/models/space/space-table-field.enum';

class Space extends AbstractModel {
  [SpaceTableField.NAME]: string;
  [SpaceTableField.CREATED_BY]: string;
  [SpaceTableField.AWS_S3_ID]: string;

  static get tableName(): string {
    return TableName.SPACES;
  }
}

export { Space };

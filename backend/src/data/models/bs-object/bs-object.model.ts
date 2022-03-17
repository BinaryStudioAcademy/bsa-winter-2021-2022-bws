import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { BSObjectField } from './bs-object-table-field.enum';

class BSObject extends AbstractModel {
  [BSObjectField.NAME]: string;
  [BSObjectField.SIZE_IN_BYTES]: number;
  [BSObjectField.CREATED_AT]: Date;
  [BSObjectField.SPACE_ID]: string;
  [BSObjectField.UPLOADED_BY]: string;
  [BSObjectField.AWS_OBJECT_KEY]: string;

  static get tableName(): string {
    return TableName.OBJECTS;
  }
}

export { BSObject };

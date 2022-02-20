import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { KeyPairTableField } from './key-pair-table-field.enum';

class KeyPair extends AbstractModel {
  [KeyPairTableField.SSH_PEM_FILE_CONTENT]: string;

  static get tableName(): string {
    return TableName.KEY_PAIRS;
  }
}

export { KeyPair };

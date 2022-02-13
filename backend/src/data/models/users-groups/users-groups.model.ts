import { AbstractModel } from '~/data/models/abstract/abstract.model';
import { TableName } from '~/common/enums/db/table-name.enum';
import { UsersGroupsTableField } from '~/data/models/users-groups/users-groups-table-field.enum';

class UsersGroups extends AbstractModel {
  [UsersGroupsTableField.USER_ID]: string;
  [UsersGroupsTableField.GROUP_ID]: string;

  static get tableName(): string {
    return TableName.USERS_GROUPS;
  }
}

export { UsersGroups };

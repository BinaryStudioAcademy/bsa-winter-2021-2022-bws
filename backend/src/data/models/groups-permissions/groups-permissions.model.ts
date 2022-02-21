import { AbstractModel } from '~/data/models/abstract/abstract.model';
import { TableName } from '~/common/enums/db/table-name.enum';
import { GroupsPermissionsTableField } from '~/data/models/groups-permissions/groups-permissions-table-field.enum';

class GroupsPermissions extends AbstractModel {
  [GroupsPermissionsTableField.PERMISSION_ID]: string;
  [GroupsPermissionsTableField.GROUP_ID]: string;

  static get tableName(): string {
    return TableName.GROUPS_PERMISSIONS;
  }
}

export { GroupsPermissions };

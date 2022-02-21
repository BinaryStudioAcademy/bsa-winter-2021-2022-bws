import { Model, RelationMappings } from 'objection';
import { join } from 'path';
import { EAMWorkerGroupsItem } from 'bws-shared/common/types/eam-worker/eam-worker-groups-item.type';
import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { WorkerTableField } from './worker-table-field.enum';
import { Group as GroupModel } from '~/data/models/models';

class Worker extends AbstractModel {
  [WorkerTableField.NAME]: string;
  [WorkerTableField.PASSWORD_HASH]: string;
  [WorkerTableField.PASSWORD_SALT]: string;
  [WorkerTableField.TENANT_ID]: string;
  [WorkerTableField.GROUPS]: EAMWorkerGroupsItem[];

  static get tableName(): string {
    return TableName.WORKERS;
  }

  static get relationMappings(): RelationMappings {
    return {
      groups: {
        relation: Model.ManyToManyRelation,
        modelClass: join(__dirname, '../group/group.model'),
        filter: (query): void => {
          const { ref } = GroupModel;
          query.select(ref('id'), ref('name'));
        },
        join: {
          from: `${TableName.WORKERS}.id`,
          through: {
            from: `${TableName.USERS_GROUPS}.userId`,
            to: `${TableName.USERS_GROUPS}.groupId`,
          },
          to: `${TableName.GROUPS}.id`,
        },
      },
    };
  }
}

export { Worker };

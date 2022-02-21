import { UsersTableAccessor } from 'common/enums/enums';
import { EAMWorkerGetAllItemResponseDto } from 'common/types/types';
import { getDistanceToDateNow } from 'helpers/helpers';

type Row = {
  [UsersTableAccessor.USERNAME]: string;
  [UsersTableAccessor.GROUPS]: string;
  [UsersTableAccessor.CREATION_TIME]: string;
};

const getRows = (workers: EAMWorkerGetAllItemResponseDto[]): Row[] => {
  return workers.map((item: EAMWorkerGetAllItemResponseDto) => {
    const { id, name, groups, createdAt } = item;

    const groupsName = groups.map((item) => item.name).join(', ');

    return {
      [UsersTableAccessor.ID]: id,
      [UsersTableAccessor.USERNAME]: name,
      [UsersTableAccessor.GROUPS]: groupsName,
      [UsersTableAccessor.CREATION_TIME]: getDistanceToDateNow(
        new Date(createdAt),
      ),
    };
  });
};

export { getRows };

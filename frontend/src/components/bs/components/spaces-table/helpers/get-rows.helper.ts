import { SpacesTableAccessor } from 'common/enums/enums';
import { BSSpaceGetResponseItemDto } from 'common/types/types';

type Row = {
  [SpacesTableAccessor.SPACE_NAME]: string;
  [SpacesTableAccessor.CREATION_TIME]: string;
};

const getRows = (spaces: BSSpaceGetResponseItemDto[]): Row[] => {
  return spaces.map((item) => {
    const { name, createdAt } = item;

    return {
      [SpacesTableAccessor.SPACE_NAME]: name,
      [SpacesTableAccessor.CREATION_TIME]: createdAt,
    };
  });
};

export { getRows };

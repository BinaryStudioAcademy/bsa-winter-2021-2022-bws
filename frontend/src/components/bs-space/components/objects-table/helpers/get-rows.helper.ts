import { ObjectsTableAccessor } from 'common/enums/enums';
import { BSObjectGetResponseItemDto } from 'common/types/types';
import { ActionCell } from '../components/components';
import { getPrettyBytes } from 'helpers/helpers';

type Row = {
  [ObjectsTableAccessor.OBJECT_NAME]: string;
  [ObjectsTableAccessor.CREATED_AT]: string;
  [ObjectsTableAccessor.SIZE]: string;
  [ObjectsTableAccessor.ACTIONS]: JSX.Element;
};

const getRows = ({
  objects,
  onObjectDownload,
  onObjectDelete,
}: {
  objects: BSObjectGetResponseItemDto[];
  onObjectDownload: (objectId: string) => void;
  onObjectDelete: (objectId: string) => void;
}): Row[] => {
  return objects.map((item) => {
    const { name, createdAt, sizeInBytes, id } = item;

    return {
      [ObjectsTableAccessor.OBJECT_NAME]: name,
      [ObjectsTableAccessor.CREATED_AT]: createdAt,
      [ObjectsTableAccessor.SIZE]: getPrettyBytes(sizeInBytes),
      [ObjectsTableAccessor.ACTIONS]: ActionCell(
        id,
        onObjectDownload,
        onObjectDelete,
      ),
    };
  });
};

export { getRows };

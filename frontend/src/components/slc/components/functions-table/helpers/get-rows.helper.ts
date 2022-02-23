import { FunctionsTableAccessor } from 'common/enums/enums';
import { SLCFunctionGetResponseItemDto } from 'common/types/types';
import { DeleteRowCell } from './cells/cells';
import { getDistanceToDateNow } from 'helpers/helpers';

type Row = {
  [FunctionsTableAccessor.FUNCTION_NAME]: string;
  [FunctionsTableAccessor.CREATION_TIME]: string;
  [FunctionsTableAccessor.UPDATION_TIME]: string;
  [FunctionsTableAccessor.ACTIONS]: JSX.Element;
};

const getRows = ({
  slcFunctions,
  onFunctionDelete,
}: {
  slcFunctions: SLCFunctionGetResponseItemDto[];
  onFunctionDelete: (id: string) => void;
}): Row[] => {
  return slcFunctions.map((item) => {
    const { id, name, updatedAt } = item;

    return {
      [FunctionsTableAccessor.FUNCTION_NAME]: name,
      [FunctionsTableAccessor.CREATION_TIME]: getDistanceToDateNow(
        new Date(updatedAt),
      ),
      [FunctionsTableAccessor.UPDATION_TIME]: getDistanceToDateNow(
        new Date(updatedAt),
      ),
      [FunctionsTableAccessor.ACTIONS]: DeleteRowCell(id, onFunctionDelete),
    };
  });
};

export { getRows };

import { Checkbox } from 'components/common/common';
import { Row } from 'react-table';

const SelectRowCell = (
  { original }: Row<Record<string, string>>,
  handleAddId: (id: string) => void,
  handleRemoveId: (id: string) => void,
  handleIsCheckedId: (id: string) => boolean,
): JSX.Element => {
  const handleCheckbox = (): void => {
    if (!handleIsCheckedId(original.id)) {
      handleAddId(original.id);
    } else {
      handleRemoveId(original.id);
    }
  };
  return (
    <div>
      <Checkbox
        label={''}
        isChecked={handleIsCheckedId(original.id)}
        onChange={handleCheckbox}
      />
    </div>
  );
};

export { SelectRowCell };

import { Checkbox } from 'components/common/common';
import { Row } from 'react-table';

const SelectRowCell = (
  { original }: Row<Record<string, string>>,
  handleAddGroupId: (id: string) => void,
  handleRemoveGroupId: (id: string) => void,
  handleIsCheckedId: (id: string) => boolean,
): JSX.Element => {
  const handleCheckbox = (): void => {
    if (!handleIsCheckedId(original.id)) {
      handleAddGroupId(original.id);
    } else {
      handleRemoveGroupId(original.id);
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

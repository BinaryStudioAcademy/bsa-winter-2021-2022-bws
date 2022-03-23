import { Checkbox } from 'components/common/common';

const ActionCell = (
  id: string,
  handleAddId: (id: string) => void,
  handleRemoveId: (id: string) => void,
  handleIsCheckedId: (id: string) => boolean,
): JSX.Element => {
  const handleCheckbox = (): void => {
    if (!handleIsCheckedId(id)) {
      handleAddId(id);
    } else {
      handleRemoveId(id);
    }
  };
  return (
    <div>
      <Checkbox
        label={''}
        isChecked={handleIsCheckedId(id)}
        onChange={handleCheckbox}
      />
    </div>
  );
};

export { ActionCell };

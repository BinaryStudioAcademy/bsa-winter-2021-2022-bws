import { FC } from 'react';
import { FilterValue, useAsyncDebounce } from 'react-table';
import { useState, useAppForm } from 'hooks/hooks';
import { Input } from 'components/common/common';
import { InputType } from 'common/enums/enums';

type Props = {
  globalFilter: string;
  setGlobalFilter: (filterValue: FilterValue) => void;
};

const GlobalFilter: FC<Props> = ({ globalFilter, setGlobalFilter }) => {
  const { control, errors } = useAppForm({
    defaultValues: { search: '' },
  });

  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  const handleFilterInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <Input
      type={InputType.TEXT}
      label=""
      placeholder="Search"
      name={'search'}
      control={control}
      errors={errors}
      value={value || ''}
      onChange={handleFilterInputChange}
    />
  );
};

export { GlobalFilter };

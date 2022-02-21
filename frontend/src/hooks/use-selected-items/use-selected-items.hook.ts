import { useState } from 'hooks/hooks';
import { UseSelectedItemsHook } from 'common/types/types';

const useSelectedItems = <T>(items: T[]): UseSelectedItemsHook<T> => {
  const [selectedItems, setSelectedItems] = useState<T[]>(items);
  const handleAdd = (id: T): void => {
    setSelectedItems((prevState) => prevState.concat(id));
  };

  const handleRemove = (id: T): void => {
    setSelectedItems((prevState) => prevState.filter((it) => it !== id));
  };

  const handleCheck = (id: T): boolean => {
    return selectedItems.some((it): boolean => it === id);
  };

  return { selectedItems, handleAdd, handleRemove, handleCheck };
};

export { useSelectedItems };

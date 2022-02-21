type UseSelectedItemsHook<T> = {
  selectedItems: T[];
  handleAdd: (id: T) => void;
  handleRemove: (id: T) => void;
  handleCheck: (id: T) => boolean;
};

export { type UseSelectedItemsHook };

type UsePaginationtemsHook = {
  onBackPage: () => void;
  onNextPage: () => void;
  allPage: number;
  currentPage: number;
  countItems: number;
  onReload: () => void;
};

export { type UsePaginationtemsHook };

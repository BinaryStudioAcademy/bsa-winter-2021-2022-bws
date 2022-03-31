import { UsePaginationtemsHook } from 'common/types/types';
import { Pagination } from 'common/enums/enums';
import { useState, useEffect } from 'hooks/hooks';

type UsePaginationArgs = {
  perPageCount: number;
  countItems: number;
  onLoad: (from: number, count: number) => void;
  from: number;
  currentPage?: number;
};

const usePagination = (
  pagination: UsePaginationArgs,
): UsePaginationtemsHook => {
  const [from, setFrom] = useState(
    pagination.from ?? Pagination.INITIAL_FROM_COUNT,
  );
  const [currentPage, setCurrentPage] = useState(
    pagination.currentPage ?? Pagination.INITIAL_CURRENT_PAGE,
  );
  const allPage = Math.ceil(pagination.countItems / pagination.perPageCount);

  const handleBackPage = (): void => {
    const backPage = currentPage - Pagination.INCREMENT;
    if (backPage !== 0) {
      setCurrentPage(backPage);
      const backFrom = from - pagination.perPageCount;
      setFrom(backFrom);
      pagination.onLoad(backFrom, pagination.perPageCount);
    }
  };
  const handleNextPage = (): void => {
    const nextPage = currentPage + Pagination.INCREMENT;
    if (nextPage <= allPage) {
      setCurrentPage(nextPage);
      const nextForm = from + pagination.perPageCount;
      setFrom(nextForm);
      pagination.onLoad(nextForm, pagination.perPageCount);
    }
  };

  const handleReload = (): void => {
    setFrom(pagination.from ?? Pagination.INITIAL_FROM_COUNT);
    setCurrentPage(pagination.currentPage ?? Pagination.INITIAL_CURRENT_PAGE);
  };

  useEffect(() => {
    if (allPage > 0 && allPage < currentPage) {
      setCurrentPage(currentPage - Pagination.INCREMENT);
      pagination.onLoad(
        from - pagination.perPageCount,
        pagination.perPageCount,
      );
    }
  }, [
    allPage,
    currentPage,
    setCurrentPage,
    pagination.onLoad,
    from,
    pagination.perPageCount,
  ]);

  return {
    onBackPage: handleBackPage,
    onNextPage: handleNextPage,
    allPage,
    currentPage,
    countItems: pagination.countItems,
    onReload: handleReload,
  };
};

export { usePagination };

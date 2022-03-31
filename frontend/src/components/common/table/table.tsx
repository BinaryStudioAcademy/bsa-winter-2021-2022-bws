import { FC } from 'react';
import {
  Column,
  useBlockLayout,
  useResizeColumns,
  useSortBy,
  useTable,
} from 'react-table';
import { getValidClasses } from 'helpers/helpers';
import styles from './styles.module.scss';
import { Pagination } from 'components/pagination/pagination';
import { Loader } from 'components/common/common';

type Props = {
  columns: Column[];
  data: unknown[];
  title?: string;
  className?: string;
  placeholder?: string;
  pagination?: {
    onBackPage: () => void;
    onNextPage: () => void;
    allPage: number;
    currentPage: number;
    countItems: number;
  };
  dataTestid?: string;
  isLoading?: boolean;
};

const Table: FC<Props> = ({
  columns,
  data,
  title,
  children,
  className,
  placeholder,
  pagination,
  dataTestid,
  isLoading,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: columns as Column<Record<string, string>>[],
        data: data as Record<string, string>[],
      },
      useSortBy,
      useBlockLayout,
      useResizeColumns,
    );

  const hasStrPlaceholder = Boolean(placeholder);
  const hasData = Boolean(data.length);
  const hasPlaceholder = hasStrPlaceholder && !hasData;
  const hasCountItems = Boolean(pagination?.countItems);

  return (
    <div
      className={getValidClasses(styles.tableWrapper, className)}
      data-testid={dataTestid}
    >
      {title && (
        <header className={styles.tableHat}>
          <h3 className={styles.tableTitle}>{title}</h3>
          {children}
        </header>
      )}
      <div className={styles.tableContainer}>
        {isLoading ? (
          <Loader />
        ) : (
          <table {...getTableProps()} className={styles.clientSideTable}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  className={styles.tableHeaderRow}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={styles.tableHeaderCell}
                    >
                      {column.render('Header')}
                      <span
                        className={getValidClasses(
                          styles.sortIndicator,
                          column.isSorted
                            ? column.isSortedDesc
                              ? styles.desc
                              : styles.asc
                            : null,
                        )}
                      />
                      <div
                        className={styles.resizer}
                        {...column.getResizerProps()}
                      />
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr className={styles.tableRow} {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className={styles.tableCell}
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {hasPlaceholder && !isLoading && (
          <div className={styles.placeholder}>{placeholder}</div>
        )}
      </div>
      {pagination && hasCountItems && (
        <Pagination
          countItems={pagination.countItems}
          currentPage={pagination.currentPage}
          allPage={pagination.allPage}
          onBackPage={pagination.onBackPage}
          onNextPage={pagination.onNextPage}
        />
      )}
    </div>
  );
};

export { Table };

import { FC } from 'react';
import {
  Column,
  useBlockLayout,
  useResizeColumns,
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
      useBlockLayout,
      useResizeColumns,
    );

  const hasStrPlaceholder = Boolean(placeholder);
  const hasData = data.length !== 0;
  const hasPlaceholder = hasStrPlaceholder && !hasData;

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
                      {...column.getHeaderProps()}
                      className={styles.tableHeaderCell}
                    >
                      {column.render('Header')}
                      <div
                        className={styles.resizer}
                        {...column.getResizerProps()}
                      ></div>
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
            {hasPlaceholder && (
              <tr className={styles.placeholder}>{placeholder}</tr>
            )}
          </table>
        )}
        ;
      </div>
      {pagination && (
        <Pagination
          countItems={pagination.countItems}
          currentPage={pagination.currentPage}
          allPage={pagination.allPage}
          handleBackPage={pagination.onBackPage}
          handleNextPage={pagination.onNextPage}
        />
      )}
    </div>
  );
};

export { Table };

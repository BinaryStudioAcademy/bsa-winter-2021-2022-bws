import { FC } from 'react';
import {
  Column,
  useBlockLayout,
  useResizeColumns,
  useTable,
} from 'react-table';
import { getValidClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  columns: Column[];
  data: unknown[];
  title?: string;
  className?: string;
  placeholder?: string;
  dataTestid?: string;
};

const Table: FC<Props> = ({
  columns,
  data,
  title,
  children,
  className,
  placeholder,
  dataTestid,
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
                      className={`${styles.resizer}`}
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
                      <td {...cell.getCellProps()} className={styles.tableCell}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {hasPlaceholder && (
        <div className={styles.placeholder}>{placeholder}</div>
      )}
    </div>
  );
};

export { Table };

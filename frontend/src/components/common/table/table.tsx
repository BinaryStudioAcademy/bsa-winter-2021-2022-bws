import { FC } from 'react';
import { useTable, Column } from 'react-table';
import { getValidClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  columns: Column[];
  data: unknown[];
  title?: string;
  className?: string;
};

const Table: FC<Props> = ({ columns, data, title, children, className }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columns as Column<Record<string, string>>[],
      data: data as Record<string, string>[],
    });

  return (
    <div className={getValidClasses(styles.tableWrapper, className)}>
      {title && (
        <header className={styles.tableHat}>
          <h3 className={styles.tableTitle}>{title}</h3>
          {children}
        </header>
      )}
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
  );
};

export { Table };

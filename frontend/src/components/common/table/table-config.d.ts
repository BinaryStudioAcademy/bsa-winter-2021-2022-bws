/* eslint-disable */
import {
  UseResizeColumnsOptions,
  UseResizeColumnsColumnProps,
  UseSortByOptions,
  UseSortByColumnProps,
  UseGlobalFiltersState,
} from 'react-table';

declare module 'react-table' {
  export interface TableOptions<D extends Record<string, unknown>>
    extends UseResizeColumnsOptions<D>,
      UseSortByOptions<D>,
      Record<string, any> {}

  export interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseSortByColumnOptions<D> {}

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseResizeColumnsColumnProps<D>,
      UseSortByColumnProps<D> {}

  export interface TableState<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseColumnOrderState<D>,
      UseGlobalFiltersState<D> {}

  export interface TableInstance<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseColumnOrderInstanceProps<D>,
      UseGlobalFiltersInstanceProps<D> {}
}

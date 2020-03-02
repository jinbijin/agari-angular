import { MatTableDataSource } from '@angular/material/table';

import { TableColumnConfiguration } from './table-column-configuration.type';

export interface TableConfiguration<T> {
  dataSource: MatTableDataSource<T>;
  columns: TableColumnConfiguration<T>[];
  headers?: false;
}

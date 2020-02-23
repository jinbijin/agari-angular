export interface TableColumnConfiguration<T> {
  id: string;
  header?: any;
  cell: (element: T) => any;
  displayed?: false;
  classes?: string[];
}

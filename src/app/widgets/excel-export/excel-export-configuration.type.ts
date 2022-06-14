export interface ExcelExportConfiguration<T = any> {
  data: T[][];
  filename: string;
  sheetname: string;
}

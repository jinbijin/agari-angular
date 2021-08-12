/* istanbul ignore file */

import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ExcelExportConfiguration } from 'src/app/instrumentation/excel/excel-export-configuration.type';
import * as Xlsx from 'xlsx';

@Injectable()
export class ExcelExportService {
  private readonly fileType: string =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  private readonly fileExtension = '.xlsx';

  public exportExcel<T = any>(config: ExcelExportConfiguration<T>): void {
    const worksheet: Xlsx.WorkSheet = Xlsx.utils.aoa_to_sheet(config.data);
    const workbook: Xlsx.WorkBook = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Sheets: { [config.sheetname]: worksheet },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      SheetNames: [config.sheetname]
    };
    const excelBuffer = Xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    const excelData: Blob = new Blob([excelBuffer], { type: this.fileType });
    FileSaver.saveAs(excelData, config.filename + this.fileExtension);
  }
}

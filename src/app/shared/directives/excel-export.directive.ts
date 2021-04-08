import { Directive, HostListener, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExcelExportService } from 'src/app/core/services/excel-export.service';
import { ExcelExportConfiguration } from 'src/app/instrumentation/excel/excel-export-configuration.type';

@Directive({
  selector: '[agariExcelExport]'
})
export class ExcelExportDirective {
  private readonly config$: BehaviorSubject<ExcelExportConfiguration | undefined> = new BehaviorSubject<
    ExcelExportConfiguration | undefined
  >(undefined);

  public constructor(private readonly excelExport: ExcelExportService) {}

  @Input('agariExcelExport')
  public set config(value: ExcelExportConfiguration) {
    this.config$.next(value);
  }

  @HostListener('click', ['$event'])
  public onClick($event) {
    const config = this.config$.value;
    if (config) {
      this.excelExport.exportExcel(config);
    }
  }
}

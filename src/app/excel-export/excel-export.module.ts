import { NgModule } from '@angular/core';
import { ExcelExportDirective } from './excel-export.directive';
import { ExcelExportService } from './excel-export.service';

@NgModule({
  declarations: [ExcelExportDirective],
  exports: [ExcelExportDirective],
  providers: [ExcelExportService]
})
export class ExcelExportModule {}

import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ScheduleRoundTableComponent } from './components/schedule-round-table/schedule-round-table.component';
import { ScheduleRoundComponent } from './components/schedule-round/schedule-round.component';
import { ExcelExportDirective } from './directives/excel-export.directive';
import { LayoutComponent } from './layout/layout.component';
import { AsNumberPipe } from './pipes/as-number.pipe';
import { AsOrdinalPipe } from './pipes/as-ordinal.pipe';
import { AsScorePipe } from './pipes/as-score.pipe';
import { BreakdownPipe } from './pipes/breakdown.pipe';
import { HideZeroPipe } from './pipes/hide-zero.pipe';
import { AgariTableComponent } from './table/agari-table.component';

const materialModules: Type<any>[] = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
];

@NgModule({
  declarations: [
    LayoutComponent,
    ScheduleRoundComponent,
    ScheduleRoundTableComponent,
    AgariTableComponent,
    ExcelExportDirective,
    AsNumberPipe,
    AsOrdinalPipe,
    AsScorePipe,
    HideZeroPipe,
    BreakdownPipe
  ],
  imports: [CommonModule, ReactiveFormsModule, ...materialModules],
  exports: [
    LayoutComponent,
    ReactiveFormsModule,
    ...materialModules,
    ScheduleRoundComponent,
    ScheduleRoundTableComponent,
    AgariTableComponent,
    ExcelExportDirective,
    AsNumberPipe,
    AsOrdinalPipe,
    AsScorePipe,
    HideZeroPipe,
    BreakdownPipe
  ]
})
export class SharedModule {}

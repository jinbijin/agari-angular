import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ExcelExportDirective } from './directives/excel-export.directive';
import { RoundParticipantCountInputComponent } from './form/round-participant-count-input/round-participant-count-input.component';
import { LayoutComponent } from './layout/layout.component';
import { AgariTableComponent } from './table/agari-table.component';

const materialModules: Type<any>[] = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule
];

@NgModule({
  declarations: [
    LayoutComponent,
    RoundParticipantCountInputComponent,
    AgariTableComponent,
    ExcelExportDirective
  ],
  imports: [CommonModule, ReactiveFormsModule, ...materialModules],
  exports: [
    LayoutComponent,
    ReactiveFormsModule,
    ...materialModules,
    RoundParticipantCountInputComponent,
    AgariTableComponent,
    ExcelExportDirective
  ]
})
export class SharedModule {}

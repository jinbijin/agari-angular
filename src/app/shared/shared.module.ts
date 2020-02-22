import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { RoundParticipantCountInputComponent } from './form/round-participant-count-input/round-participant-count-input.component';
import { LayoutComponent } from './layout/layout.component';

const materialModules: Type<any>[] = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatTableModule,
  MatToolbarModule
];

@NgModule({
  declarations: [LayoutComponent, RoundParticipantCountInputComponent],
  imports: [CommonModule, ReactiveFormsModule, ...materialModules],
  exports: [
    LayoutComponent,
    ReactiveFormsModule,
    ...materialModules,
    RoundParticipantCountInputComponent
  ]
})
export class SharedModule {}

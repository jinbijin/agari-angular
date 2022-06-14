import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { ParticipantNumberComponent } from './participant/participant.component';
import { RoundRobinRoundComponent } from './round-robin-round.component';
import { TableNumberComponent } from './table/table.component';

@NgModule({
  declarations: [RoundRobinRoundComponent, ParticipantNumberComponent, TableNumberComponent],
  imports: [SharedModule, MatCardModule, CdkTableModule],
  exports: [RoundRobinRoundComponent]
})
export class RoundRobinRoundModule { }

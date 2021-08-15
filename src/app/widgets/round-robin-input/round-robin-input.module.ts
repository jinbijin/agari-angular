import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { RoundRobinInputApiService } from './round-robin-input-api.service';
import { RoundRobinInputComponent } from './round-robin-input-form/round-robin-input.component';
import { RoundRobinInputDirective } from './round-robin-input.directive';

@NgModule({
  declarations: [RoundRobinInputDirective, RoundRobinInputComponent],
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [RoundRobinInputDirective, RoundRobinInputComponent],
  providers: [RoundRobinInputApiService]
})
export class RoundRobinInputModule {}

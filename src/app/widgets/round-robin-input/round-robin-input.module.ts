import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { SharedModule } from '../shared/shared.module';
import { RoundRobinInputApiService } from './round-robin-input-api.service';
import { RoundRobinInputFormComponent } from './round-robin-input-form/round-robin-input-form.component';
import { RoundRobinInputDirective } from './round-robin-input.directive';

@NgModule({
  declarations: [RoundRobinInputDirective, RoundRobinInputFormComponent],
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ErrorMessageModule,
  ],
  exports: [RoundRobinInputDirective, RoundRobinInputFormComponent],
  providers: [RoundRobinInputApiService]
})
export class RoundRobinInputModule {}

import { NgModule } from '@angular/core';
import { ErrorMessageComponent } from './error-message.component';
import { ErrorMessageService } from './error-message.service';

@NgModule({
  declarations: [ErrorMessageComponent],
  exports: [ErrorMessageComponent],
  providers: [ErrorMessageService]
})
export class ErrorMessageModule {}

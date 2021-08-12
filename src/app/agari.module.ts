import { NgModule } from '@angular/core';

import { AgariComponent } from './agari.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AgariComponent],
  imports: [CoreModule.forRoot()],
  bootstrap: [AgariComponent]
})
export class AgariModule {}

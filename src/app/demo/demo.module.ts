import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoComponent } from './demo.component';
import { DEMO_ROUTES } from './demo.routes';

@NgModule({
  declarations: [DemoComponent],
  imports: [CommonModule, RouterModule.forChild(DEMO_ROUTES)],
})
export class DemoModule {}

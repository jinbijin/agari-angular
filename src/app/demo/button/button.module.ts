import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'src/app/components/button/button.module';
import { DemoButtonComponent } from './button.component';
import { DEMO_BUTTON_ROUTES } from './button.routes';

@NgModule({
  declarations: [DemoButtonComponent],
  imports: [CommonModule, RouterModule.forChild(DEMO_BUTTON_ROUTES), ButtonModule],
})
export class DemoButtonModule {}

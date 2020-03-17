import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'agari-event-manager-step',
  templateUrl: './event-manager-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventManagerStepComponent {
  public rank: number;

  @ViewChild(MatExpansionPanel) public panel: MatExpansionPanel;

  @ContentChild('header') public header: TemplateRef<any>;

  @ContentChild('content') public content: TemplateRef<any>;
}

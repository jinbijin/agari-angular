import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UpdateNotificationService } from './core/pwa/update-notification.service';

@Component({
  selector: 'agari-root',
  templateUrl: './agari.component.html',
  styleUrls: ['./agari.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgariComponent {
  public constructor(updateNotificationService: UpdateNotificationService) {}
}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { agariRoutes } from 'src/app/agari.routes';
import { AgariRoutes } from 'src/app/instrumentation/routes/agari-routes.type';

@Component({
  selector: 'agari-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public brand: string = 'アガリ';

  @Input()
  public routes: AgariRoutes = agariRoutes;

  public displayedRoutes: AgariRoutes;

  constructor() {}

  public ngOnInit(): void {
    this.displayedRoutes = this.routes.filter(r => r.display);
  }
}

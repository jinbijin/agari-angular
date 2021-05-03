import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { agariRoutes } from 'src/app/agari.routes';
import { AgariRoutes } from 'src/app/instrumentation/routes/agari-routes.type';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[agariHeader]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input()
  public routes: AgariRoutes = agariRoutes;

  public readonly brand: string = 'アガリ';

  public displayedRoutes: AgariRoutes;

  public constructor() {}

  public ngOnInit(): void {
    this.displayedRoutes = this.routes.filter(r => r.display);
  }

}

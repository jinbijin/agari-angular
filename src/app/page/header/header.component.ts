import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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

  public routes: AgariRoutes = agariRoutes.filter(r => r.display);

  constructor() {}

  public ngOnInit(): void {}
}

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const largeBreakpoint: string = '(min-width: 1280px)';

@Component({
  selector: 'agari-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit {
  public sidenavOpened: Observable<boolean>;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.sidenavOpened = breakpointObserver
      .observe(largeBreakpoint)
      .pipe(map(state => state.breakpoints[largeBreakpoint]));
  }

  public ngOnInit(): void {}
}

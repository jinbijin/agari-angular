import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const largeBreakpoint = '(min-width: 1200px)';

@Component({
  selector: 'agari-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit {
  public sidenavOpened: Observable<boolean>;

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  public ngOnInit(): void {
    this.sidenavOpened = this.breakpointObserver
      .observe(largeBreakpoint)
      .pipe(map(state => state.breakpoints[largeBreakpoint]));
  }
}

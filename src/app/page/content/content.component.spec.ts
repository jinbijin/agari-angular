import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EMPTY, of } from 'rxjs';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { ContentComponent } from './content.component';

describe('ContentComponent', () => {
  let page: Page;
  let breakpointObserverStub: Partial<BreakpointObserver>;

  beforeEach(async () => {
    return await TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        MatSidenavStubComponent,
        ContentComponent
      ],
      providers: [
        {
          provide: BreakpointObserver,
          useFactory: () => breakpointObserverStub
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  afterEach(() => {
    breakpointObserverStub = {};
  });

  it('should create', () => {
    breakpointObserverStub = {
      observe: query => EMPTY
    };
    page = new Page(TestBed.createComponent(TestHostComponent));
    page.detectChanges();

    expect(page.root).toBeTruthy();
  });

  it('should have a sidenav', () => {
    breakpointObserverStub = {
      observe: query => EMPTY
    };
    page = new Page(TestBed.createComponent(TestHostComponent));
    page.detectChanges();

    expect(page.sidenavContainer).toBeTruthy();
    expect(page.sidenav).toBeTruthy();
    expect(page.sidenavContent).toBeTruthy();
  });

  it('should contain the router outlet', () => {
    breakpointObserverStub = {
      observe: query => EMPTY
    };
    page = new Page(TestBed.createComponent(TestHostComponent));
    page.detectChanges();

    expect(page.routerOutlet).toBeTruthy();
  });

  it('should open sidenav for larger screens', () => {
    breakpointObserverStub = {
      observe: query =>
        typeof query === 'string'
          ? of({ breakpoints: { [query]: true }, matches: true })
          : EMPTY
    };
    page = new Page(TestBed.createComponent(TestHostComponent));
    page.detectChanges();

    expect(page.sidenavComponent.opened).toBeTruthy();
  });

  it('should close sidenav for smaller screens', () => {
    breakpointObserverStub = {
      observe: query =>
        typeof query === 'string'
          ? of({ breakpoints: { [query]: false }, matches: false })
          : EMPTY
    };
    page = new Page(TestBed.createComponent(TestHostComponent));
    page.detectChanges();

    expect(page.sidenavComponent.opened).toBeFalsy();
  });
});

class Page extends PageBase<TestHostComponent> {
  get root(): HTMLElement {
    return this.query<HTMLElement>('agari-content');
  }

  get sidenavContainer(): HTMLElement {
    return this.query<HTMLElement>('mat-sidenav-container');
  }

  get sidenavContent(): HTMLElement {
    return this.query<HTMLElement>('mat-sidenav-content');
  }

  get sidenav(): HTMLElement {
    return this.query<HTMLElement>('mat-sidenav');
  }

  get routerOutlet(): HTMLElement {
    return this.query<HTMLElement>('router-outlet');
  }

  get sidenavComponent(): MatSidenavStubComponent {
    return this.fixture.debugElement.query(
      By.directive(MatSidenavStubComponent)
    ).componentInstance;
  }
}

@Component({
  template: `
    <agari-content></agari-content>
  `
})
class TestHostComponent {}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mat-sidenav',
  template: ''
})
class MatSidenavStubComponent {
  @Input()
  public opened: boolean;
}

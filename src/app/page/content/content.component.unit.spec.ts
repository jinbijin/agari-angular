import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { ContentComponent } from './content.component';

describe('ContentComponent', () => {
  let page: Page;
  let breakpointObserverStub: Partial<BreakpointObserver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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

  it('should open sidenav for larger screens', () => {
    breakpointObserverStub = {
      observe: query =>
        typeof query === 'string'
          ? of({ breakpoints: { [query]: true }, matches: true })
          : EMPTY
    };
    page = new Page(TestBed.createComponent(TestHostComponent));
    page.detectChanges();

    expect(page.sidenav.opened).toBeTruthy();
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

    expect(page.sidenav.opened).toBeFalsy();
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): ContentComponent {
    return this.component(ContentComponent) as ContentComponent;
  }

  public get host(): TestHostComponent {
    return this.component() as TestHostComponent;
  }

  get sidenav(): MatSidenavStubComponent {
    return this.component(MatSidenavStubComponent);
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

import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSidenavHarness } from '@angular/material/sidenav/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EMPTY, of } from 'rxjs';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { ContentComponent } from './content.component';

describe('ContentComponent integration', () => {
  let page: Page;
  let breakpointObserverStub: Partial<BreakpointObserver>;

  describe('with MatSidenav', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestHostComponent, ContentComponent],
        imports: [NoopAnimationsModule, MatSidenavModule],
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

    it('should create', async () => {
      breakpointObserverStub = {
        observe: query =>
          typeof query === 'string'
            ? of({ breakpoints: { [query]: true }, matches: true })
            : EMPTY
      };
      page = new Page(TestBed.createComponent(TestHostComponent));
      page.detectChanges();

      const sidenav = await page.loader.getHarness(MatSidenavHarness);
      expect(sidenav).toBeTruthy();
      expect(await sidenav.getMode()).toEqual('side');
      expect(await sidenav.isOpen()).toEqual(true);
      expect(await sidenav.getPosition()).toEqual('start');
      expect(await sidenav.isFixedInViewport()).toEqual(false);
    });
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): ContentComponent {
    return this.component(ContentComponent) as ContentComponent;
  }

  public get host(): TestHostComponent {
    return this.component() as TestHostComponent;
  }
}

@Component({
  template: `
    <agari-content></agari-content>
  `
})
class TestHostComponent {}

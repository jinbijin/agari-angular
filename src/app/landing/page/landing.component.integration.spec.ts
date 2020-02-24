import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageBase } from 'src/app/instrumentation/test/page-base';
import { LandingComponent } from 'src/app/landing/page/landing.component';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

describe('LandingComponent integration', () => {
  let page: Page;

  describe('with LayoutComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [LandingComponent, LayoutComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      page = new Page(TestBed.createComponent(LandingComponent));
      page.detectChanges();
    });

    it('should create', () => {
      expect(page.layout).toBeTruthy();
    });
  });
});

class Page extends PageBase<LandingComponent> {
  public get root(): LandingComponent {
    return this.component();
  }

  public get layout(): LayoutComponent {
    return this.component(LayoutComponent);
  }
}

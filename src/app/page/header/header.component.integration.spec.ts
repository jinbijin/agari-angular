import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AgariRoutes } from 'src/app/instrumentation/routes/agari-routes.type';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { HeaderComponent } from './header.component';

describe('HeaderComponent integration', () => {
  let page: Page;

  describe('with MatMenu', () => {
    let overlayContainer: OverlayContainer;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestHostComponent, HeaderComponent],
        imports: [NoopAnimationsModule, MatMenuModule, MatButtonModule],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      inject([OverlayContainer], (oc: OverlayContainer) => (overlayContainer = oc))();

      page = new Page(TestBed.createComponent(TestHostComponent));
    });

    it('should get the correct number of menu-items', async () => {
      page.host.routes = [{ label: 'Test', path: '/test', display: true }];
      page.detectChanges();

      const matButton = await page.loader.getHarness(MatButtonHarness.with({ selector: '.mat-icon-button' }));
      expect(matButton).toBeTruthy();

      const matMenu = await page.loader.getHarness(MatMenuHarness);
      expect(matMenu).toBeTruthy();

      await matButton.click();
      const matMenuOpened = await matMenu.isOpen();
      expect(matMenuOpened).toEqual(true);

      const matMenuItems = await matMenu.getItems();
      expect(matMenuItems.length).toEqual(1);
    });
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): HeaderComponent {
    return this.component(HeaderComponent);
  }

  public get host(): TestHostComponent {
    return this.component();
  }
}

@Component({
  template: `
    <agari-header [routes]="routes"></agari-header>
  `
})
class TestHostComponent {
  public routes: AgariRoutes;
}

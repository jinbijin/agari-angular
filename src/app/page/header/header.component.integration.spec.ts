import { Component, Directive, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { AgariRoutes } from 'src/app/instrumentation/routes/agari-routes.type';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { HeaderComponent } from './header.component';

describe('HeaderComponent integration', () => {
  let page: Page;

  describe('with MatToolbar', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          TestHostComponent,
          HeaderComponent,
          MatMenuStubDirective
        ],
        imports: [MatToolbarModule],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      page = new Page(TestBed.createComponent(TestHostComponent));
    });

    it('should create', () => {
      page.host.routes = [];
      page.detectChanges();

      expect(page.matToolbar).toBeTruthy();
    });
  });

  describe('with MatMenu', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestHostComponent, HeaderComponent],
        imports: [MatMenuModule],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      page = new Page(TestBed.createComponent(TestHostComponent));
    });

    it('should create', async () => {
      page.host.routes = [];
      page.detectChanges();

      const matMenu = await page.loader.getHarness(MatMenuHarness);
      expect(matMenu).toBeTruthy();
    });
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): HeaderComponent {
    return this.component(HeaderComponent) as HeaderComponent;
  }

  public get host(): TestHostComponent {
    return this.component() as TestHostComponent;
  }

  public get matToolbar(): MatToolbar {
    return this.component(MatToolbar);
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

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'mat-menu',
  exportAs: 'matMenu'
})
class MatMenuStubDirective {}

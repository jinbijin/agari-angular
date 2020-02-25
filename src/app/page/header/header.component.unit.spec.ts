import { Component, Directive, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AgariRoutes } from 'src/app/instrumentation/routes/agari-routes.type';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let page: Page;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent, HeaderComponent, MatMenuStubDirective],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    page = new Page(TestBed.createComponent(TestHostComponent));
  });

  it('should create', () => {
    page.host.routes = [];
    page.detectChanges();

    expect(page.root).toBeTruthy();
  });

  it(`should have brand 'アガリ'`, () => {
    page.host.routes = [];
    page.detectChanges();

    expect(page.brand).toBeTruthy();
    expect(page.brand.textContent).toEqual('アガリ');
  });

  it('should have a menu', () => {
    page.host.routes = [];
    page.detectChanges();

    expect(page.matMenu).toBeTruthy();
  });

  it('should have displayed menu-items', () => {
    page.host.routes = [{ label: 'Test', display: true }];
    page.detectChanges();

    expect(page.matMenu.querySelectorAll('a').length).toEqual(1);
  });

  it('should have a menu-item display the label', () => {
    page.host.routes = [{ label: 'Test', display: true }];
    page.detectChanges();

    const item = page.matMenu.querySelectorAll('a')[0];
    expect(item.text).toEqual('Test');
  });

  it('should have a menu-item link to url', () => {
    page.host.routes = [{ label: 'Test', path: '/test', display: true }];
    page.detectChanges();

    const item = page.matMenu.querySelectorAll('a')[0];
    expect((item as any).routerLink).toEqual('/test');
  });

  it('should not have non-displayed menu-items', () => {
    page.host.routes = [
      {
        label: 'Test',
        display: false
      }
    ];
    page.detectChanges();

    expect(page.matMenu.querySelectorAll('a').length).toEqual(0);
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): HeaderComponent {
    return this.component(HeaderComponent) as HeaderComponent;
  }

  public get host(): TestHostComponent {
    return this.component() as TestHostComponent;
  }

  get brand(): HTMLElement {
    return this.query<HTMLElement>('a');
  }

  get menuButton(): HTMLButtonElement {
    return this.query<HTMLButtonElement>('button');
  }

  get matMenu(): HTMLElement {
    return this.query<HTMLElement>('mat-menu');
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

import { Component, Directive, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { AgariComponent } from './agari.component';
import { ContentComponent } from './page/content/content.component';
import { FooterComponent } from './page/footer/footer.component';
import { HeaderComponent } from './page/header/header.component';

describe('AgariComponent integration', () => {
  let page: Page;

  describe('with HeaderComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          TestHostComponent,
          AgariComponent,
          HeaderComponent,
          MatMenuStubDirective
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      page = new Page(TestBed.createComponent(TestHostComponent));
      page.detectChanges();
    });

    it('should create', () => {
      expect(page.header).toBeTruthy();
    });
  });

  describe('with ContentComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestHostComponent, AgariComponent, ContentComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      page = new Page(TestBed.createComponent(TestHostComponent));
      page.detectChanges();
    });

    it('should create', async () => {
      expect(page.content).toBeTruthy();
    });
  });

  describe('with FooterComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestHostComponent, AgariComponent, FooterComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      page = new Page(TestBed.createComponent(TestHostComponent));
      page.detectChanges();
    });

    it('should create', () => {
      expect(page.footer).toBeTruthy();
    });
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): AgariComponent {
    return this.component(AgariComponent);
  }

  public get host(): TestHostComponent {
    return this.component();
  }

  public get header(): HeaderComponent {
    return this.component(HeaderComponent);
  }

  public get content(): ContentComponent {
    return this.component(ContentComponent);
  }

  public get footer(): FooterComponent {
    return this.component(FooterComponent);
  }
}

@Component({
  template: `
    <agari-root></agari-root>
  `
})
class TestHostComponent {}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'mat-menu',
  exportAs: 'matMenu'
})
class MatMenuStubDirective {}

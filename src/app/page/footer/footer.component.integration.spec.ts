import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { FooterComponent } from './footer.component';

describe('FooterComponent integration', () => {
  let page: Page;

  describe('with MatToolbar', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestHostComponent, FooterComponent],
        imports: [MatToolbarModule],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      page = new Page(TestBed.createComponent(TestHostComponent));
      page.detectChanges();
    });

    it('should create', async () => {
      expect(page.matToolbar).toBeTruthy();
    });
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): FooterComponent {
    return this.component(FooterComponent);
  }

  public get host(): TestHostComponent {
    return this.component();
  }

  public get matToolbar(): MatToolbar {
    return this.component(MatToolbar);
  }
}

@Component({
  template: `
    <agari-footer></agari-footer>
  `
})
class TestHostComponent {}

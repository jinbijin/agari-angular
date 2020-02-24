import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AgariComponent } from 'src/app/agari.component';
import { PageBase } from 'src/app/instrumentation/test/page-base';

describe('AgariComponent', () => {
  let page: Page;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent, AgariComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    page = new Page(TestBed.createComponent(TestHostComponent));
    page.detectChanges();
  });

  it('should create the app', () => {
    expect(page.root).toBeTruthy();
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): AgariComponent {
    return this.component(AgariComponent);
  }

  public get host(): TestHostComponent {
    return this.component();
  }
}

@Component({
  template: `
    <agari-root></agari-root>
  `
})
class TestHostComponent {}

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let page: Page;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    page = new Page(TestBed.createComponent(LandingComponent));
    page.detectChanges();
  });

  it('should create', () => {
    expect(page.root).toBeTruthy();
  });
});

class Page extends PageBase<LandingComponent> {
  public get root(): LandingComponent {
    return this.component();
  }
}

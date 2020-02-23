import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let page: Page;

  beforeEach(async () => {
    return await TestBed.configureTestingModule({
      declarations: [LandingComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(TestBed.createComponent(LandingComponent));
    page.detectChanges();
  });

  it('should create', () => {
    expect(page.component).toBeTruthy();
  });

  it('should use the standard layout', () => {
    expect(page.agariLayout).toBeTruthy();
  });
});

class Page extends PageBase<LandingComponent> {
  get agariLayout(): HTMLElement {
    return this.query('agari-layout');
  }
}

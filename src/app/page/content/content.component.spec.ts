import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { ContentComponent } from './content.component';

describe('ContentComponent', () => {
  let page: Page;

  beforeEach(async () => {
    return await TestBed.configureTestingModule({
      declarations: [TestHostComponent, ContentComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(TestBed.createComponent(TestHostComponent));
  });

  it('should create', () => {
    expect(page.root).toBeTruthy();
  });

  it('should have a sidenav container', () => {
    expect(page.sidenavContainer).toBeTruthy();
  });

  it('should have sidenav content', () => {
    expect(page.sidenavContent).toBeTruthy();
  });

  it('should contain the router outlet', () => {
    expect(page.routerOutlet).toBeTruthy();
  });
});

class Page extends PageBase<TestHostComponent> {
  get root(): HTMLElement {
    return this.query<HTMLElement>('agari-content');
  }

  get sidenavContainer(): HTMLElement {
    return this.query<HTMLElement>('mat-sidenav-container');
  }

  get sidenavContent(): HTMLElement {
    return this.query<HTMLElement>('mat-sidenav');
  }

  get routerOutlet(): HTMLElement {
    return this.query<HTMLElement>('router-outlet');
  }
}

@Component({
  template: `
    <agari-content></agari-content>
  `
})
class TestHostComponent {}
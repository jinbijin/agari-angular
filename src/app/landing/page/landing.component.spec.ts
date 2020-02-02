import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let fixture: ComponentFixture<LandingComponent>;
  let page: Page;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LandingComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    page = new Page(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(page.root).toBeTruthy();
  });
});

class Page extends PageBase<LandingComponent> {
  get root(): LandingComponent {
    return this.fixture.debugElement.componentInstance;
  }

  constructor(fixture: ComponentFixture<LandingComponent>) {
    super(fixture);
  }
}

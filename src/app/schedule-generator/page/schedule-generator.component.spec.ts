import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { ScheduleGeneratorComponent } from './schedule-generator.component';

describe('ScheduleGeneratorComponent', () => {
  let fixture: ComponentFixture<ScheduleGeneratorComponent>;
  let page: Page;

  beforeEach(async () => {
    return await TestBed.configureTestingModule({
      declarations: [ScheduleGeneratorComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleGeneratorComponent);
    page = new Page(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(page.root).toBeTruthy();
  });
});

class Page extends PageBase<ScheduleGeneratorComponent> {
  get root(): ScheduleGeneratorComponent {
    return this.fixture.debugElement.componentInstance;
  }

  constructor(fixture: ComponentFixture<ScheduleGeneratorComponent>) {
    super(fixture);
  }
}

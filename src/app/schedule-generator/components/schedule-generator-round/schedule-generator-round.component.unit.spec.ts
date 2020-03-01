import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScheduleRound } from 'src/app/graphql/generated/types';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { ScheduleGeneratorRoundComponent } from './schedule-generator-round.component';

describe('ScheduleGeneratorRoundComponent', () => {
  let page: Page;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, ScheduleGeneratorRoundComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(TestBed.createComponent(TestHostComponent));
  });

  it('should create', () => {
    page.detectChanges();

    expect(page.root).toBeTruthy();
  });

  it('should contain round number', () => {
    page.host.roundNumber = 1;
    page.detectChanges();

    expect(page.matCardTitle.textContent).toEqual('Round 1');
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): ScheduleGeneratorRoundComponent {
    return this.component(ScheduleGeneratorRoundComponent);
  }

  public get host(): TestHostComponent {
    return this.component();
  }

  public get matCardTitle(): HTMLElement {
    return this.query<HTMLElement>('mat-card-title');
  }
}

@Component({
  template: `
    <agari-schedule-generator-round
      [roundNumber]="roundNumber"
      [scheduleRound]="scheduleRound"
    ></agari-schedule-generator-round>
  `
})
class TestHostComponent {
  public roundNumber: number;
  public scheduleRound: ScheduleRound;
}

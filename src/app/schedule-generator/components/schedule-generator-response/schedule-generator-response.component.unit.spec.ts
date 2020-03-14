import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { QueryOptionsAlone } from 'apollo-angular/types';
import { ApolloQueryResult, NetworkStatus } from 'apollo-client';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  GenerateScheduleGQL,
  GenerateScheduleQuery,
  GenerateScheduleQueryVariables
} from 'src/app/graphql/generated/types';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { GenerateSchedule } from '../../store/schedule-generator.action';
import { ScheduleGeneratorState } from '../../store/schedule-generator.state';

import { ScheduleGeneratorResponseComponent } from './schedule-generator-response.component';

describe('ScheduleGeneratorResponseComponent', () => {
  let page: Page;
  let store: Store;
  let generateScheduleGql: GenerateScheduleGqlStub;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, ScheduleGeneratorResponseComponent],
      imports: [NgxsModule.forRoot([ScheduleGeneratorState]), ApolloTestingModule],
      providers: [
        {
          provide: GenerateScheduleGQL,
          useFactory: () => new GenerateScheduleGqlStub()
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.inject(Store);
    generateScheduleGql = TestBed.inject(GenerateScheduleGQL);

    page = new Page(TestBed.createComponent(TestHostComponent));
  });

  it('should create', () => {
    page.detectChanges();

    expect(page.root).toBeTruthy();
  });

  it('should generate rounds', async () => {
    const generateScheduleMock = jest.fn((v, o) =>
      of({
        data: { generateSchedule: { rounds: [{ games: [] }, { games: [] }] } },
        loading: false,
        networkStatus: NetworkStatus.ready,
        stale: false
      })
    );
    generateScheduleGql.fetch = generateScheduleMock;

    page.detectChanges();

    store.dispatch(new GenerateSchedule({ roundCount: 4, participantCount: 20 }));
    await page.fixture.whenStable();
    page.detectChanges();

    expect(generateScheduleMock.mock.calls).toEqual([
      [{ participantCount: 20, roundCount: 4 }, { fetchPolicy: 'network-only' }],
      [{ participantCount: 20, roundCount: 4 }, { fetchPolicy: 'cache-only' }],
      [{ participantCount: 20, roundCount: 4 }, { fetchPolicy: 'cache-only' }]
    ]);
    expect(page.scheduleGeneratorRounds.length).toEqual(2);
  });

  it('should throw on network error', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const generateScheduleMock = jest.fn((v, o) =>
      of({
        data: { generateSchedule: { rounds: [] } },
        loading: false,
        networkStatus: NetworkStatus.ready,
        stale: false
      }).pipe(
        tap(data => {
          throw { message: 'test' };
        })
      )
    );
    generateScheduleGql.fetch = generateScheduleMock;

    page.detectChanges();

    store.dispatch(new GenerateSchedule({ roundCount: 4, participantCount: 20 }));
    await page.fixture.whenStable();
    page.detectChanges();

    expect(errorSpy.mock.calls).toEqual([['ERROR', { message: 'test' }]]);
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): ScheduleGeneratorResponseComponent {
    return this.component(ScheduleGeneratorResponseComponent);
  }

  public get host(): TestHostComponent {
    return this.component();
  }

  public get scheduleGeneratorRounds(): HTMLElement[] {
    return this.queryAll('agari-schedule-generator-round');
  }
}

@Component({
  template: `
    <agari-schedule-generator-response></agari-schedule-generator-response>
  `
})
class TestHostComponent {}

class GenerateScheduleGqlStub {
  public fetch: (
    variables?: GenerateScheduleQueryVariables,
    options?: QueryOptionsAlone<GenerateScheduleQueryVariables>
  ) => Observable<ApolloQueryResult<GenerateScheduleQuery>>;
}

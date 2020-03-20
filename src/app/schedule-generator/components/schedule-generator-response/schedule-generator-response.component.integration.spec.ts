import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { QueryOptionsAlone } from 'apollo-angular/types';
import { ApolloQueryResult, NetworkStatus } from 'apollo-client';
import { Observable, of } from 'rxjs';
import {
  GenerateScheduleGQL,
  GenerateScheduleQuery,
  GenerateScheduleQueryVariables
} from 'src/app/graphql/generated/types';
import { PageBase } from 'src/app/instrumentation/test/page-base';
import { ScheduleRoundComponent } from 'src/app/shared/components/schedule-round/schedule-round.component';

import { GenerateSchedule } from '../../store/schedule-generator.action';
import { ScheduleGeneratorState } from '../../store/schedule-generator.state';

import { ScheduleGeneratorResponseComponent } from './schedule-generator-response.component';

describe('ScheduleGeneratorResponseComponent integration', () => {
  let page: Page;
  let store: Store;
  let generateScheduleGql: GenerateScheduleGqlStub;

  describe('with ScheduleGeneratorRoundComponent', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        declarations: [TestHostComponent, ScheduleGeneratorResponseComponent, ScheduleRoundComponent],
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

    it('should pass data', async () => {
      const generateScheduleMock = jest.fn((v, o) =>
        of({
          data: {
            generateSchedule: {
              rounds: [{ games: [{ participantNrs: [1, 2, 3, 4] }] }]
            }
          },
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
      expect(page.scheduleRound.roundNumber).toEqual(1);
      expect(page.scheduleRound.scheduleRound).toEqual({
        games: [{ participantNrs: [1, 2, 3, 4] }]
      });
    });
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): ScheduleGeneratorResponseComponent {
    return this.component(ScheduleGeneratorResponseComponent);
  }

  public get host(): TestHostComponent {
    return this.component();
  }

  public get scheduleRound(): ScheduleRoundComponent {
    return this.component(ScheduleRoundComponent);
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

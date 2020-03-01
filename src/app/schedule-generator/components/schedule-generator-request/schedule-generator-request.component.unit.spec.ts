import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
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

import { ScheduleGeneratorState } from '../../store/schedule-generator.state';

import { ScheduleGeneratorRequestComponent } from './schedule-generator-request.component';

describe('ScheduleGeneratorRequestComponent', () => {
  let page: Page;
  let generateScheduleGql: GenerateScheduleGqlStub;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, ScheduleGeneratorRequestComponent],
      imports: [NgxsModule.forRoot([ScheduleGeneratorState])],
      providers: [
        {
          provide: GenerateScheduleGQL,
          useFactory: () => new GenerateScheduleGqlStub()
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    generateScheduleGql = TestBed.inject(GenerateScheduleGQL);

    page = new Page(TestBed.createComponent(TestHostComponent));
  });

  it('should create', () => {
    page.detectChanges();

    expect(page.root).toBeTruthy();
  });

  it('should dispatch on click', () => {
    const generateScheduleMock = jest.fn((v, o) =>
      of({
        data: { generateSchedule: { rounds: [] } },
        loading: false,
        networkStatus: NetworkStatus.ready,
        stale: false
      })
    );
    generateScheduleGql.fetch = generateScheduleMock;
    page.detectChanges();

    page.button.triggerEventHandler('click', {});
    page.detectChanges();

    expect(generateScheduleMock.mock.calls).toEqual([
      [
        { participantCount: undefined, roundCount: undefined },
        { fetchPolicy: 'network-only' }
      ]
    ]);
  });

  it('should throw on network error on click', async () => {
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

    page.button.triggerEventHandler('click', {});
    page.detectChanges();

    expect(errorSpy.mock.calls).toEqual([['ERROR', { message: 'test' }]]);
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): ScheduleGeneratorRequestComponent {
    return this.component(ScheduleGeneratorRequestComponent);
  }

  public get host(): TestHostComponent {
    return this.component();
  }

  public get button(): DebugElement {
    return this.fixture.debugElement.query(By.css('button'));
  }
}

@Component({
  template: `
    <agari-schedule-generator-request></agari-schedule-generator-request>
  `
})
class TestHostComponent {}

class GenerateScheduleGqlStub {
  public fetch: (
    variables?: GenerateScheduleQueryVariables,
    options?: QueryOptionsAlone<GenerateScheduleQueryVariables>
  ) => Observable<ApolloQueryResult<GenerateScheduleQuery>>;
}

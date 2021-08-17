import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ErrorData } from 'src/app/instrumentation/types/response/error-data.type';
import { Response } from 'src/app/instrumentation/types/response/response.type';
import { RoundRobinSchedule } from 'src/app/instrumentation/types/schedule/round-robin-schedule.type';
import { RoundRobinInputKey } from 'src/app/widgets/round-robin-input/round-robin-input-controls.type';
import { environment } from 'src/environments/environment';
import { ApiErrored, ApiResponded } from './schedule-generator.actions';

@Injectable()
export class ScheduleGeneratorApiService {
  constructor(private readonly httpClient: HttpClient, private readonly store: Store) {}

  public generateSchedule(request: Record<RoundRobinInputKey, number>): Observable<void> {
    return this.httpClient
      .get<Response<RoundRobinSchedule, ErrorData>>(`${environment.apiBaseUrl}/schedule/round-robin?participantCount=${request.participantCount}&roundCount=${request.roundCount}`)
      .pipe(
        tap(response => this.store.dispatch(new ApiResponded(response, request))),
        catchError(error => this.store.dispatch(new ApiErrored())),
        map(() => undefined)
      );
  }
}

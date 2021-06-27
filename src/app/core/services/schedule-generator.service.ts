import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorData } from 'src/app/instrumentation/types/response/error-data.type';
import { Response } from 'src/app/instrumentation/types/response/response.type';
import { RoundParticipantCount } from 'src/app/instrumentation/types/round-participant-count.type';
import { RoundRobinSchedule } from 'src/app/instrumentation/types/schedule/round-robin-schedule.type';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ScheduleGeneratorService {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #http: HttpClient;

  public constructor(http: HttpClient) {
    this.#http = http;
  }

  public generateSchedule(roundParticipantCount: RoundParticipantCount): Observable<Response<RoundRobinSchedule, ErrorData>> {
    return this.#http.post<Response<RoundRobinSchedule, ErrorData>>(`${environment.apiBaseUrl}/schedule/round-robin`, roundParticipantCount);
  }

  public validateGenerateScheduleQuery(roundParticipantCount: RoundParticipantCount): Observable<Response<boolean, ErrorData>> {
    return this.#http.post<Response<boolean, ErrorData>>(`${environment.apiBaseUrl}/schedule/round-robin/validate`, roundParticipantCount);
  }
}

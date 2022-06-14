import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorData } from 'src/app/instrumentation/types/response/error-data.type';
import { Response } from 'src/app/instrumentation/types/response/response.type';
import { RoundParticipantCount } from 'src/app/instrumentation/types/round-participant-count.type';
import { RoundRobinSchedule } from 'src/app/instrumentation/types/schedule/round-robin-schedule.type';
import { environment } from 'src/environments/environment';

@Injectable()
export class ScheduleGeneratorService {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #http: HttpClient;

  public constructor(http: HttpClient) {
    this.#http = http;
  }

  public getMaxRounds(participantCount: number): Observable<Response<number, ErrorData>> {
    return this.#http.get<Response<number, ErrorData>>(`${environment.apiBaseUrl}/schedule/round-robin/max-rounds?participantCount=${participantCount}`);
  }

  public generateSchedule(roundParticipantCount: RoundParticipantCount): Observable<Response<RoundRobinSchedule, ErrorData>> {
    return this.#http.get<Response<RoundRobinSchedule, ErrorData>>(`${environment.apiBaseUrl}/schedule/round-robin?participantCount=${roundParticipantCount.participantCount}&roundCount=${roundParticipantCount.roundCount}`);
  }

  public validateGenerateScheduleQuery(roundParticipantCount: RoundParticipantCount): Observable<Response<boolean, ErrorData>> {
    return this.#http.get<Response<boolean, ErrorData>>(`${environment.apiBaseUrl}/schedule/round-robin/validate?participantCount=${roundParticipantCount.participantCount}&roundCount=${roundParticipantCount.roundCount}`);
  }
}

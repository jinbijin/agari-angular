import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorData } from 'src/app/instrumentation/types/response/error-data.type';
import { Response } from 'src/app/instrumentation/types/response/response.type';
import { environment } from 'src/environments/environment';

@Injectable()
export class RoundRobinInputApiService {
  constructor(private readonly httpClient: HttpClient) {}

  public getMaxRounds(participantCount: number): Observable<Response<number, ErrorData>> {
    return this.httpClient.get<Response<number, ErrorData>>(`${environment.apiBaseUrl}/schedule/round-robin/max-rounds?participantCount=${participantCount}`);
  }
}

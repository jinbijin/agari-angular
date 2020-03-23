import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { Status } from '../enum/status.enum';

export class ObservableHelper {
  public static setStatus<T>(observable: Observable<T>, setStatus: (value: Status) => void): Observable<T> {
    setStatus(Status.InProgress);
    return observable.pipe(
      finalize(() => setStatus(Status.Done)),
      catchError(error => {
        setStatus(Status.Failed);
        throw error;
      })
    );
  }
}

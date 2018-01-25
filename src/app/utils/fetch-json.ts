import { Observable } from 'rxjs';
import * as Rx from 'rx';

export function fetchResponse(url: URL): Observable<Response> {
  return Observable.fromPromise(fetch(url.href));
}

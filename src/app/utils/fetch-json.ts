import { Observable } from 'rxjs';

export function fetchJson(url: URL): Observable<any> {
  return Observable.fromPromise(
    fetch(url.href))
      .flatMap((response) => Observable.fromPromise(response.json()));
}

import { Observable } from 'rxjs';
import { BtcCurrentHypermedia } from './btc-current-hypermedia';
import { fetchResponse } from '../../utils/fetch-json';
import * as utpl from 'uri-templates';
import * as moment from 'moment';
import { Currency } from '../currency';
import { of } from 'rxjs/observable/of';

export function btcCurrentFetch(currency: Currency): Observable<BtcCurrentHypermedia> {
  const url = utpl('https://api.coindesk.com/v1/bpi/currentprice/{cur}.json')
    .fillFromObject({
        cur: currency.toUpperCase()
      });
  return Observable.timer(0, 1000)
    .flatMap(() => fetchResponse(new URL(url)))
    .flatMap(_ => Observable.fromPromise(_.json()));
}

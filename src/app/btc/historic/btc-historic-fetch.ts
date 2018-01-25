import { Observable } from 'rxjs';
import { BtcHistoricHypermedia } from './btc-historic-hypermedia';
import { fetchResponse } from '../../utils/fetch-json';
import * as utpl from 'uri-templates';
import * as moment from 'moment';
import { Currency } from '../currency';

export function btcHistoricFetch(from: Date, to: Date, currency: Currency): Observable<BtcHistoricHypermedia> {
  const url = utpl('https://api.coindesk.com/v1/bpi/historical/close.json?currency={cur}&start={start}&end={end}')
    .fillFromObject({
        start: moment(from).format('YYYY-MM-DD'),
        end: moment(to).format('YYYY-MM-DD'),
        cur: currency
      });
  return fetchResponse(new URL(url))
    .flatMap(_ => Observable.fromPromise(_.json()));
}

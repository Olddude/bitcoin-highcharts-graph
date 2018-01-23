import { Observable } from 'rxjs';
import { fetchJson } from '../utils/fetch-json';
import * as utpl from 'uri-templates';
import * as moment from 'moment';
import { yearAgo, today } from '../utils/date-utils';

export type Currency = 'USD' | 'EUR' | 'GBP';

export function fetchHistoricPrice(from: Date, to: Date, currency: Currency): Observable<any> {
  const url = utpl('https://api.coindesk.com/v1/bpi/historical/close.json?currency={cur}&start={start}&end={end}')
    .fillFromObject({
        start: moment(from).format('YYYY-MM-DD'),
        end: moment(to).format('YYYY-MM-DD'),
        cur: currency
      });
  return fetchJson(new URL(url));
}

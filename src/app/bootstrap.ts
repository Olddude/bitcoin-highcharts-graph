import { Observable } from 'rxjs';
import { stringify } from './utils/stringify';
import { generateChart } from './highcharts/generate-chart';
import { SeriesObject, DataPoint } from 'highcharts';
import * as Highcharts from 'highcharts';
import * as utpl from 'uri-templates';
import { getParamAs } from './utils/get-param-as';
import { now, yearAgo, hourAgo, yesterday } from './utils/date-utils';
import { de } from './i18n/de';
import { configureOptions } from './highcharts/configure-options';
import { setGlobalOptions } from './highcharts/set-global-options';
import * as moment from 'moment';
import { btcHistoricFetch } from './btc/historic/btc-historic-fetch';
import { Currency } from './btc/currency';
import { btcCurrentFetch } from './btc/current/btc-current-fetch';
import { Entry } from './btc/current/btc-current-hypermedia';

export function bootstrap() {
  setGlobalOptions();

  const chart = generateChart('target', configureOptions());

  const start = getParamAs<Date>('start') || yesterday();
  const end = getParamAs<Date>('end') || now();
  const currency = getParamAs<Currency>('currency') || 'EUR';

  const historicFetchObs$ = btcHistoricFetch(start, end, currency)
    .map(data => {
      chart.update({ title:
        { text: `Bitcoin Preisentwicklung von: ${moment(start).format('DD.MM.YYYY')} \
        bis: ${moment(end).format('DD.MM.YYYY')}` }
      });
      chart.update({ yAxis: { title: { text: `Preis in ${currency}` } } });
      chart.series[0].setData(Object.keys(data.bpi).map(_ => <DataPoint> {
        x: Date.parse(_),
        y: Number(data.bpi[_])
      }));
    });

  const currentFetchObs$ = btcCurrentFetch(currency)
    .map(_ => {
      const entry = _.bpi[`${currency}`] as Entry;
      const point = <DataPoint> {
        x: Date.now(),
        y: entry.rate_float
      };
      chart.series[0].addPoint(point, true, true);
    });

  historicFetchObs$.concat(currentFetchObs$)
    .subscribe();
}

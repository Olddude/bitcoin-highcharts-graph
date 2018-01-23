import { fetchHistoricPrice, Currency } from './btc/fetch-historic-price';
import { stringify } from './utils/stringify';
import { generateChart } from './highcharts/generate-chart';
import { SeriesObject } from 'highcharts';
import * as Highcharts from 'highcharts';
import * as utpl from 'uri-templates';
import { getParamAs } from './utils/get-param-as';
import { today, yearAgo } from './utils/date-utils';
import { de } from './i18n/de';
import { configureOptions } from './highcharts/configure-options';
import { setGlobalOptions } from './highcharts/set-global-options';
import * as moment from 'moment';

export function bootstrap() {
  setGlobalOptions();

  const chart = generateChart('target', configureOptions());

  const start = getParamAs<Date>('start') || yearAgo();
  const end = getParamAs<Date>('end') || today();
  const currency = getParamAs<Currency>('currency') || 'EUR';

  fetchHistoricPrice(start, end, currency)
    .map(data => {
      chart.update({ title:
        { text: `Bitcoin Preisentwicklung von: ${moment(start).format('DD.MM.YYYY')} \
        bis: ${moment(end).format('DD.MM.YYYY')}` }
      });
      chart.update({ yAxis: { title: { text: `Preis in ${currency}` } } });
      return Object.keys(data.bpi).map(_ => ([Date.parse(_), Number(data.bpi[_])]));
    })
    .subscribe(
      points => {
        chart.series[0].setData(points);
      },
      error => console.error(error)
    );
}

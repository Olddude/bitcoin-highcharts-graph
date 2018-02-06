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

  const start = getParamAs<Date>('start') || yesterday();
  const end = getParamAs<Date>('end') || now();
  const currency = getParamAs<Currency>('currency') || 'EUR';

  const chart = generateChart('target', configureOptions());
}

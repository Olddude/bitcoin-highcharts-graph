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
import { Entry, BtcCurrentHypermedia } from './btc/current/btc-current-hypermedia';
import { saveToStorage } from './storage/save-to-storage';
import { loadAll } from './storage/load-from-storage';

export function bootstrap() {
  setGlobalOptions();

  const currency = 'EUR';
  
  const options = configureOptions({
    chart: {
      zoomType: 'x',
      events: {
        load: function() {
          const series = this.series[0];
          btcCurrentFetch(currency)
            .map(data => {
              saveToStorage(window.localStorage, data, 'btc');
              return data;
            })
            .map(data => {
              const x = (new Date(data.time.updated)).getTime();
              const y = data.bpi[currency].rate_float;
              return { dateTime: x, value: y };
            })
            .subscribe(point => series.addPoint([point.dateTime, point.value], true, true));
        }
      }
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
          text: `Price in EUR`
      },
      plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
      }]
    },
    series: [{
      data: (function() {
        const data = [];
        loadAll(window.localStorage, 'btc')
          .map(_ => _.value)
          .map(_ => {
            const x = (new Date(_.time.updated)).getTime();
            const y = _.bpi[currency].rate_float;
            return { dateTime: x, value: y };
          })
          .map(point => data.push([point.dateTime, point.value]));
        return data;
      }())
    }]
  });

  const chart = generateChart('target', options);
}

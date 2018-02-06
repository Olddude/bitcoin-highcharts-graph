import { Options } from 'highcharts';
import * as Highcharts from 'highcharts';
import { de } from '../i18n/de';
import * as deepmerge from 'deepmerge';
import { btcCurrentFetch } from '../btc/current/btc-current-fetch';
import { saveToStorage } from '../storage/save-to-storage';
import { loadAll } from '../storage/load-from-storage';

export function configureOptions(options: Options = {}): Options {
  return deepmerge(options, {
    chart: {
      type: 'spline',
      events: {
        load: function() {
          const series = this.series[0];
          btcCurrentFetch('EUR')
            .map(data => {
              const x = (new Date()).getTime();
              const y = data.bpi['EUR'].rate_float;
              const point = { dateTime: x, value: y };
              saveToStorage(window.localStorage, point, 'btc');
              series.addPoint([point.dateTime, point.value], true, true);
              return point;
            })
            .subscribe(point => console.log(point));
        }
      }
    },
    title: {
      text: 'Bitcoin live chart'
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150
    },
    yAxis: {
      title: {
          text: 'Price in EUR'
      },
      plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
      }]
    },
    legend: {
      enabled: false
    },
    series: [{
      pointStart: (new Date()).getTime(),
      data: (function() {
        return loadAll(window.localStorage, 'btc')
          .map(_ => _.value)
          .map(_ => <any> { x: _.dateTime, y: _.value });
    }())
    }]
  });
}

import { Options } from 'highcharts';
import * as Highcharts from 'highcharts';
import { de } from '../i18n/de';
import * as deepmerge from 'deepmerge';

export function configureOptions(options: Options = {}): Options {
  return deepmerge(options, {
    chart: {
      type: 'spline',
      zoomType: 'x'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: de.date
    },
    yAxis: {
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
      type: 'spline'
    }]
  });
}

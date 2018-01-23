import { Options } from 'highcharts';
import * as Highcharts from 'highcharts';
import { de } from '../i18n/de';
import * as deepmerge from 'deepmerge';

export function configureOptions(options: Options = {}): Options {
  return deepmerge(options, {
    chart: {
      zoomType: 'x'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: de.date
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
          },
          stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0])]
          ]
        },
        marker: {
            radius: 2
        },
        lineWidth: 1,
        states: {
            hover: {
                lineWidth: 1
            }
        },
        threshold: null
      }
    },
    series: [{}]
  });
}

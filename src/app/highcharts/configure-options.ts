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
      type: 'spline'
    },
    title: {
      text: 'Bitcoin live chart (UTC)'
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150
    },
    legend: {
      enabled: false
    }
  });
}

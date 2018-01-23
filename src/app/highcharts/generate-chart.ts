import * as Highcharts from 'highcharts';
import { GlobalOptions, ChartObject, Options } from 'highcharts';

export function generateChart(elementId: string, options: Options): ChartObject {
  return Highcharts.chart(elementId, options);
}

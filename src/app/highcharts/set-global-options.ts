import * as Highcharts from 'highcharts';
import { de } from '../i18n/de';

export function setGlobalOptions() {
  Highcharts.setOptions({
    lang: de.lang,
    global: {
      useUTC: false
    }
  });
}

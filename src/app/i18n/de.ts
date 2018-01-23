import { LangObject, DateTimeFormats } from 'highcharts';

export const de:
  { lang: LangObject, date: DateTimeFormats, xAxis: string, yAxis: string, dateTimeFormats: string } = {
    lang: {
        decimalPoint: ',',
        thousandsSep: '.',
        shortMonths: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    },
    date: {
        day: '%e.%b %Y',
        month: '%e.%b %Y',
        year: '%b %Y',
    },
    xAxis: 'Datum',
    yAxis: 'Werte',
    dateTimeFormats: '%e.%b %Y, %H:%M'
};

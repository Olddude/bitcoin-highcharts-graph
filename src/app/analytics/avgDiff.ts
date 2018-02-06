import { pipe, filter, compose } from 'ramda';

const testData = [
  6041.4242,
  6026.4466,
  6011.467,
  6003.631,
  5990.6955,
  5977.1531,
  5959.071,
  5938.8583,
  5897.3204,
  5894.6812,
  5958.9172,
  5919.1341,
  5905.1263,
  5957.5806,
  5931.6635,
  5917.4195,
  5925.2274,
  5917.5009,
  5923.4445,
  5961.6609,
  5983.5027,
  5959.9363
];

export function subDiffs(values: number[]): number[] {
  const output = [];
  values.reduce((a, c) => {
    output.push(c - a);
    return c;
  });
  return output;
}

export function avg(values: number[]) {
  return {
    title: 'average',
    count: values.length,
    result: values.reduce((a, c) => a + c, 0) / values.length
  };
}

const print = (...items: Array<{key: string, value: any}>) =>
  items.forEach(item => console.log(`\n${item.key}: \n${JSON.stringify(item.value)}\n`));

const avgSubDiffs = compose(avg, subDiffs);
const positivAvgSubDiffs = compose(avg, arr => filter(_ => _ > 0, arr), subDiffs);
const negativeAvgSubDiffs = compose(avg, arr => filter(_ => _ <= 0, arr), subDiffs);

print(
  { key: 'total average subtraction diffs', value: avgSubDiffs(testData) },
  { key: 'negative average subtraction diffs', value: negativeAvgSubDiffs(testData) },
  { key: 'positiv average subtraction diffs', value: positivAvgSubDiffs(testData) }
);

export interface BtcCurrentHypermedia {
  time: Time;
  disclaimer: string;
  bpi: Bpi;
}

export type Bpi = [{key: string, value: Entry}];

export interface Entry {
  code: string;
  rate: string;
  description: string;
  rate_float: number;
}

export interface Time {
  updated: Date;
  updatedISO: Date;
  updateduk: Date;
}

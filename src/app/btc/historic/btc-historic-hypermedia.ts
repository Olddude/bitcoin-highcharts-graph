export interface BtcHistoricHypermedia {
  bpi: Bpi;
  disclaimer: string;
  time: Time;
}

export interface Time {
  updated: Date;
  updatedISO: Date;
}

export type Bpi = [{key: string, value: number}];

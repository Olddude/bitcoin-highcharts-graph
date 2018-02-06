import { expect } from 'chai';
import { FakeStorage } from './fake-storage';
import { loadAll } from '../../app/storage/load-from-storage';

describe('load from storage', () => {
  let fakeStorage;
  let storageKey;

  beforeEach(() => {
    fakeStorage = new FakeStorage();
    storageKey = 'btc';
  });

  it('should load all items properly', () => {
    fakeStorage[`${storageKey}`] = JSON.stringify([
      { key: '123', value: { foo: 'bar' } },
      { key: '124', value: { bar: 'foo' } }
    ]);
    expect(loadAll(fakeStorage, storageKey)).to.eql([
      { key: '123', value: { foo: 'bar' } },
      { key: '124', value: { bar: 'foo' } }
    ]);
  });
});

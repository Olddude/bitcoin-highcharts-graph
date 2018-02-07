import { expect } from 'chai';
import { FakeStorage } from './fake-storage';
import { saveToStorage } from '../../app/storage/save-to-storage';

describe('save to storage', () => {
  let fakeStorage: Storage;
  let storageKey;

  beforeEach(() => {
    fakeStorage = new FakeStorage();
    storageKey = 'foobar';
  });

  it('should create an new storage entry uppon first save', () => {
    const objToSave = { foo: 'bar' };
    expect(Object.keys(fakeStorage)).to.eql([]);
    saveToStorage(fakeStorage, objToSave, storageKey);
    expect(Object.keys(fakeStorage)).to.contain(storageKey);
  });

  it('should not add an new entry if entry is equal', () => {
    const objToSave = { foo: 'bar' };
    saveToStorage(fakeStorage, objToSave, storageKey);
    saveToStorage(fakeStorage, objToSave, storageKey);
    expect(Array.from(JSON.parse(fakeStorage.getItem(storageKey))).length).to.eql(1);
  });

  it('should add a second entry if it is unique', () => {
    const firstObj = { foo: 'bar' };
    saveToStorage(fakeStorage, firstObj, storageKey);
    const secondObj = { bar: 'foo' };
    saveToStorage(fakeStorage, secondObj, storageKey);
    expect(Array.from(JSON.parse(fakeStorage.getItem(storageKey))).length).to.eql(2);
  });
});

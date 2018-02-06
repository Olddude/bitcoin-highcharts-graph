import { sha1 } from 'object-hash';
import { IEntity } from './entity';

export function saveToStorage(storage: Storage, objToSave: any, saveObjKey: string) {
  if (keyExists(storage, saveObjKey)) {
    appendToKeyObject(storage, objToSave, saveObjKey);
  } else {
    createNewSaveObject(storage, objToSave, saveObjKey);
  }
}

function keyExists(storage: Storage, saveObjKey: string) {
  return storage.getItem(saveObjKey);
}

function appendToKeyObject(storage: Storage, objToSave: any, saveObjKey: string): string {
  const saveObjJson = storage.getItem(saveObjKey);
  const saveObjArray: IEntity[] = Array(JSON.parse(saveObjJson));
  const hash = sha1(objToSave);
  if (!saveObjArray.find(_ => _.key === hash)) {
    saveObjArray.push({ key: hash, value: objToSave });
    storage.setItem(saveObjKey, JSON.stringify(saveObjArray));
    return hash;
  }
}

function createNewSaveObject(storage: Storage, objToSave: any, saveObjKey: string): string {
  const hash = sha1(objToSave);
  const saveObjArray = [{ key: hash, value: objToSave }];
  storage.setItem(saveObjKey, JSON.stringify(saveObjArray));
  return hash;
}

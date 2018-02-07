import { IEntity } from './entity';

export function loadAll(storage: Storage, key: string): IEntity[] {
  let output;
  try {
    output = Array.from<IEntity>(JSON.parse(storage.getItem(key)));
  } catch (e) {
    output = [];
  }
  return output;
}

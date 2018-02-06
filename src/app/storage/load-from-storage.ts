import { IEntity } from './entity';

export function loadAll(storage: Storage, key: string): IEntity[] {
  return Array.from<IEntity>(JSON.parse(storage.getItem(key)));
}

import { getUriParams } from '../utils/get-uri-params';

export function getParamAs<T>(key: string): T {
  return getUriParams()[key] as T;
}

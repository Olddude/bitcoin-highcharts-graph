import * as querystring from 'query-string';

export function getUriParams(): any {
  return querystring.parse(location.search);
}

import { parse } from 'query-string';


export function extractQuery(url) {
  if (!url || url.split('?').length < 2) {
    return {};
  }

  const searchString = url.split('?')[1];
  return { ...parse(searchString) };
}

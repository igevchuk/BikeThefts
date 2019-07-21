
import * as moment from 'moment';

export function omit<T extends object, K extends keyof T>(target: T, ...omitKeys: K[]): Omit<T, K> {
  return (Object.keys(target) as K[]).reduce(
    (res, key) => {
      if (!omitKeys.includes(key)) {
        res[key] = target[key];
      }
      return res;
    },
    {} as any
  );
}

export function formatDate(input: string | number, format?: string): string {
  return moment(input).format(format || 'LLL');
}

export const fetchUrl = <T>(url: string): Promise<T> =>
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });

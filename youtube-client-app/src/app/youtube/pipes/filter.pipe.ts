import { Pipe, PipeTransform } from '@angular/core';
import { IItem } from '../models/search-item.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: IItem[], ...args: [string, boolean | string]): any {
    if (!value) return;

    const [type, predicate] = args;

    switch (type) {
      case 'date': {
        return value.sort((a, b) => {
          const firstDate = Date.parse(a.snippet.publishedAt);
          const secondDate = Date.parse(b.snippet.publishedAt);

          return predicate ? firstDate - secondDate : secondDate - firstDate;
        });
      }

      case 'views': {
        return value.sort((a, b) => {
          const { viewCount: first } = a.statistics;
          const { viewCount: second } = b.statistics;

          return predicate ? +first - +second : +second - +first;
        });
      }

      case 'keyword': {
        const keyword = predicate as string;

        if (keyword.length < 2) {
          return value;
        }

        return value.filter((item) => {
          let regExp = new RegExp(keyword, 'i');

          return item.snippet.title.match(regExp);
        });
      }
    }

    return value;
  }
}

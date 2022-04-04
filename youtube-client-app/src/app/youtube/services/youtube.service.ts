import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IFilterSettings } from '../models/filterSettings.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  filteringBlockIsVisible = false;

  dataIsFetched = false;

  filterSettings: IFilterSettings = {
    dateByAsc: false,
    viewsByAsc: false,
    keyword: '',
  };

  userQuery = new FormGroup({
    request: new FormControl(['']),
  });

  changeFilteringBlockVisibility() {
    this.filteringBlockIsVisible = !this.filteringBlockIsVisible;
  }

  fetchData() {
    if (!this.dataIsFetched) this.dataIsFetched = true;
  }

  changeFilter(type: string, keyword = '') {
    switch (type) {
      case 'date': {
        this.filterSettings.dateByAsc = !this.filterSettings.dateByAsc;
        break;
      }

      case 'views': {
        this.filterSettings.viewsByAsc = !this.filterSettings.viewsByAsc;
        break;
      }

      case 'keyword': {
        this.filterSettings.keyword = keyword;
        break;
      }

      default: {
        break;
      }
    }
  }

  reset() {
    this.filterSettings = {
      dateByAsc: false,
      viewsByAsc: false,
      keyword: '',
    };

    this.filteringBlockIsVisible = false;
    this.dataIsFetched = false;
    this.userQuery.get('request')?.setValue('');
  }
}

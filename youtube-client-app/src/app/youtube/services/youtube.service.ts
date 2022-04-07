import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IFilterSettings } from '../models/filterSettings.model';
import { IItem } from '../models/search-item.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  fetchedData!: IItem[];

  currentVideoInformation!: IItem | null;

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
    if (!this.dataIsFetched) {
      this.dataIsFetched = true;

      const URL =
        'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/angular/response.json';
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          this.fetchedData = Object.values(data)[3] as IItem[];
        })
        .catch((err) => console.log(err));
    }
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

  setCurrentVideoInfo(id: string) {
    if (this.fetchedData) {
      this.currentVideoInformation = this.fetchedData.find(
        (video) => video.id === id
      ) as IItem;
    }
  }

  resetCurrentVideoInfo() {
    this.currentVideoInformation = null;
  }
}

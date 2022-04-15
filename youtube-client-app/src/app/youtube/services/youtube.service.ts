import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { getRequiredUrlWithPath } from 'src/utils/getRequiredUrlWithPath';
import { IFilterSettings } from '../models/filterSettings.model';
import { IItem } from '../models/search-item.model';
import { IResponse } from '../models/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  fetchedData!: IItem[];

  currentVideoInformation!: IItem | null;

  filteringBlockIsVisible = false;

  filterSettings: IFilterSettings = {
    dateByAsc: false,
    viewsByAsc: false,
    keyword: '',
  };

  userQuery = new FormGroup({
    request: new FormControl(['']),
  });

  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  changeFilteringBlockVisibility() {
    this.filteringBlockIsVisible = !this.filteringBlockIsVisible;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Server returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  fetchData() {
    const { href } = new URL(getRequiredUrlWithPath('search'));

    this.httpClient
      .get<IResponse>(href)
      .pipe(catchError(this.handleError))
      .subscribe((response) => {
        const { items } = response;

        const ids = items.map((item) => item.id.videoId).join(',');

        this.fetchStatistics(ids);
      });
  }

  fetchStatistics(ids: string) {
    const { href } = new URL(getRequiredUrlWithPath('videos'));

    this.httpClient
      .get<IResponse>(href, { params: { id: ids } })
      .pipe(catchError(this.handleError))
      .subscribe((response) => {
        this.fetchedData = response.items;
      });
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

    this.userQuery.get('request')?.setValue('');
  }

  setCurrentVideoInfo(id: string) {
    if (this.fetchedData) {
      this.currentVideoInformation = this.fetchedData.find((video) => {
        const currId = video.id as unknown as string;
        return currId === id;
      }) as IItem;
    }
  }

  resetCurrentVideoInfo() {
    this.currentVideoInformation = null;
  }
}

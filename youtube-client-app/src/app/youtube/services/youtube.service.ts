import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, throwError } from 'rxjs';
import {
  changeFilter,
  resetFilter,
} from 'src/app/redux/actions/filter.actions';
import {
  changeFilteringBlockVisibility,
  resetCurrentVideoInfo,
  setCurrentVideoInfo,
  setIsLoading,
} from 'src/app/redux/actions/youtube.actions';
import { IFilterReducer, IState } from 'src/app/redux/state.model';
import { getRequiredUrlWithPath } from 'src/utils/getRequiredUrlWithPath';
import { IItem } from '../models/search-item.model';
import { IResponse } from '../models/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  currentVideoInformation!: IItem | null;

  filteringBlockIsVisible$: Observable<boolean>;

  filterSettings$: Observable<IFilterReducer>;

  userQuery = new FormGroup({
    request: new FormControl(['']),
  });

  loading$ = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private store: Store<IState>) {
    this.httpClient = httpClient;

    this.filterSettings$ = this.store.select((state) => state.filterReducer);

    this.filteringBlockIsVisible$ = this.store.select(
      (state) => state.youtubeReducer.filteringBlockIsVisible
    );
  }

  changeFilteringBlockVisibility() {
    this.store.dispatch(changeFilteringBlockVisibility({}));
  }

  handleError(error: HttpErrorResponse) {
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

    this.store.dispatch(setIsLoading());

    return this.httpClient.get<IResponse>(href);
  }

  fetchStatistics(ids: string) {
    const { href } = new URL(getRequiredUrlWithPath('videos'));

    return this.httpClient.get<IResponse>(href, { params: { id: ids } });
  }

  changeFilter(filterByType: string, keyword = '') {
    this.store.dispatch(changeFilter({ filterByType, keyword }));
  }

  reset() {
    this.store.dispatch(resetFilter());

    this.store.dispatch(changeFilteringBlockVisibility({ isVisible: 'false' }));

    this.userQuery.get('request')?.setValue('');
  }

  setCurrentVideoInfo(id: string) {
    this.store.dispatch(setCurrentVideoInfo({ id }));
  }

  resetCurrentVideoInfo() {
    this.store.dispatch(resetCurrentVideoInfo());
  }
}

import { createAction, props } from '@ngrx/store';
import { IItem } from 'src/app/youtube/models/search-item.model';

export const changeFilteringBlockVisibility = createAction(
  '[Youtube] changeFilteringBlockVisibility',
  props<{ isVisible?: string }>()
);

export const setIsLoading = createAction('[Youtube] setIsLoading');

export const setCurrentVideoInfo = createAction(
  '[Youtube] setCurrentVideoInfo',
  props<{ id: string }>()
);

export const resetCurrentVideoInfo = createAction(
  '[Youtube] resetCurrentVideoInfo'
);

export const fetchData = createAction('[Youtube] fetchData');

export const dataIsFetched = createAction(
  '[Youtube] dataIsFetched',
  props<{ ids: string }>()
);

export const fetchStatistics = createAction(
  '[Youtube] fetchStatistics',
  props<{ ids: string }>()
);

export const statisticsIsFetched = createAction(
  '[Youtube] statisticsIsFetched',
  props<{ items: IItem[] }>()
);

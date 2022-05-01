import { createAction, props } from '@ngrx/store';

export const changeFilter = createAction(
  '[Filter] changeFilter',
  props<{ filterByType: string; keyword?: string }>()
);

export const resetFilter = createAction('[Filter] resetFilter');

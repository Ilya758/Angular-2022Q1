import { createReducer, on } from '@ngrx/store';
import { changeFilter, resetFilter } from '../actions/filter.actions';
import { IFilterReducer } from '../state.model';

const initialState: IFilterReducer = {
  dateByAsc: false,
  viewsByAsc: false,
  keyword: '',
};

export const filterReducer = createReducer(
  initialState,

  on(changeFilter, (state, { filterByType, keyword }) => {
    switch (filterByType) {
      case 'date': {
        const { dateByAsc } = state;

        return {
          ...state,
          dateByAsc: !dateByAsc,
        };
      }

      case 'views': {
        const { viewsByAsc } = state;

        return {
          ...state,
          viewsByAsc: !viewsByAsc,
        };
      }

      case 'keyword': {
        return {
          ...state,
          keyword: keyword as string,
        };
      }

      default: {
        return state;
      }
    }
  }),

  on(resetFilter, () => ({
    dateByAsc: false,
    keyword: '',
    viewsByAsc: false,
  }))
);

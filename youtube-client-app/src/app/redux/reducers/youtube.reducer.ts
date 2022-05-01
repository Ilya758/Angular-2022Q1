import { createReducer, on } from '@ngrx/store';
import { IItem } from 'src/app/youtube/models/search-item.model';
import {
  changeFilteringBlockVisibility,
  dataIsFetched,
  resetCurrentVideoInfo,
  setCurrentVideoInfo,
  setIsLoading,
  statisticsIsFetched,
} from '../actions/youtube.actions';
import { IYoutubeReducer } from '../state.model';

const initialState: IYoutubeReducer = {
  currentVideoInformation: null,
  dataIsLoading: false,
  fetchedData: null,
  filteringBlockIsVisible: false,
  ids: '',
};

export const youtubeReducer = createReducer(
  initialState,

  on(changeFilteringBlockVisibility, (state, { isVisible }) => {
    const predicate = isVisible?.length
      ? false
      : !state.filteringBlockIsVisible;

    return {
      ...state,
      filteringBlockIsVisible: predicate,
    };
  }),

  on(setIsLoading, (state) => ({
    ...state,
    dataIsLoading: !state.dataIsLoading,
  })),

  on(setCurrentVideoInfo, (state, { id }) => {
    if (state.fetchedData) {
      const currentVideoInformation = state.fetchedData!.find((video) => {
        const currId = video.id as unknown as string;
        return currId === id;
      }) as IItem;

      return {
        ...state,
        currentVideoInformation,
      };
    }

    return state;
  }),

  on(resetCurrentVideoInfo, (state) => ({
    ...state,
    currentVideoInformation: null,
  })),

  on(dataIsFetched, (state, { ids }) => {
    return {
      ...state,
      ids,
    };
  }),

  on(statisticsIsFetched, (state, { items }) => {
    return {
      ...state,
      fetchedData: items,
    };
  })
);

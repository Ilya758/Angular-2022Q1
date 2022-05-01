import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap } from 'rxjs';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';
import { fetchStatistics, setIsLoading } from '../actions/youtube.actions';
import { IState } from '../state.model';

@Injectable()
export class YoutubeEffects {
  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Youtube] fetchData'),
      mergeMap(() =>
        this.youtubeService.fetchData().pipe(
          map(({ items }) => {
            const ids = items.map((item) => item.id.videoId).join(',');

            this.store.dispatch(fetchStatistics({ ids }));

            return { type: '[Youtube] dataIsFetched', ids };
          })
        )
      )
    )
  );

  fetchStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchStatistics),
      switchMap(({ ids }) => {
        return this.youtubeService.fetchStatistics(ids).pipe(
          map(({ items }) => {
            this.store.dispatch(setIsLoading());

            return { type: '[Youtube] statisticsIsFetched', items };
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private youtubeService: YoutubeService,
    private store: Store<IState>
  ) {}
}

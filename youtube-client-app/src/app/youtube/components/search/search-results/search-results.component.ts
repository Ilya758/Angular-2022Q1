import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFilterReducer, IState } from 'src/app/redux/state.model';
import { IItem } from 'src/app/youtube/models/search-item.model';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  youtubeService: YoutubeService;

  dataIsLoading$!: Observable<boolean>;

  fetchedData$!: Observable<IItem[]>;

  filterSettings$: Observable<IFilterReducer>;

  constructor(youtubeService: YoutubeService, private store: Store<IState>) {
    this.youtubeService = youtubeService;

    this.dataIsLoading$ = this.store.select(
      (state) => state.youtubeReducer.dataIsLoading
    );

    this.fetchedData$ = this.store.select(
      (state) => state.youtubeReducer.fetchedData!
    );

    this.filterSettings$ = this.store.select((state) => state.filterReducer);
  }

  ngOnInit(): void {
    this.youtubeService.resetCurrentVideoInfo();
  }
}

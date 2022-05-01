import { Component, DoCheck, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IState } from 'src/app/redux/state.model';
import { IItem } from '../../models/search-item.model';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-detailed-information-page',
  templateUrl: './detailed-information-page.component.html',
  styleUrls: ['./detailed-information-page.component.scss'],
})
export class DetailedInformationPageComponent implements DoCheck, OnDestroy {
  youtubeService!: YoutubeService;
  @Input() item!: IItem;

  observer$: Subscription;

  currentVideoInformation!: IItem;

  private id = this.route.snapshot.params['id'];

  constructor(
    youtubeService: YoutubeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<IState>
  ) {
    this.youtubeService = youtubeService;
    this.route = route;

    this.observer$ = this.store.subscribe(
      ({ youtubeReducer: { currentVideoInformation } }) => {
        this.currentVideoInformation = currentVideoInformation as IItem;
      }
    );
  }

  ngDoCheck(): void {
    this.youtubeService.setCurrentVideoInfo(this.id);

    if (!this.currentVideoInformation) {
      this.router.navigate(['/404']);
      return;
    }
  }

  ngOnDestroy(): void {
    this.youtubeService.currentVideoInformation = null;
    this.observer$.unsubscribe();
  }
}

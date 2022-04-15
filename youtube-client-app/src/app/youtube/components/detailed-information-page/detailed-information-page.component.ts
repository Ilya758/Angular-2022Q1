import { Component, DoCheck, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  private id = this.route.snapshot.params['id'];

  constructor(
    youtubeService: YoutubeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.youtubeService = youtubeService;
    this.route = route;
  }

  ngDoCheck(): void {
    this.youtubeService.setCurrentVideoInfo(this.id);
    this.item = this.youtubeService.currentVideoInformation as IItem;

    if (!this.item) {
      this.router.navigate(['/404']);
      return;
    }
  }

  ngOnDestroy(): void {
    this.youtubeService.currentVideoInformation = null;
  }
}

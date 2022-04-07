import { Component, DoCheck, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IItem } from '../../models/search-item.model';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-detailed-information-page',
  templateUrl: './detailed-information-page.component.html',
  styleUrls: ['./detailed-information-page.component.scss'],
})
export class DetailedInformationPageComponent
  implements OnInit, DoCheck, OnDestroy
{
  youtubeService!: YoutubeService;
  @Input() item!: IItem;

  private id = this.route.snapshot.params['id'];

  constructor(youtubeService: YoutubeService, private route: ActivatedRoute) {
    this.youtubeService = youtubeService;
    this.route = route;
  }

  ngOnInit(): void {
    if (!this.youtubeService.dataIsFetched) {
      this.youtubeService.fetchData();
    }
  }

  ngDoCheck(): void {
    this.youtubeService.setCurrentVideoInfo(this.id);
    this.item = this.youtubeService.currentVideoInformation as IItem;
  }

  ngOnDestroy(): void {
    this.youtubeService.currentVideoInformation = null;
  }
}

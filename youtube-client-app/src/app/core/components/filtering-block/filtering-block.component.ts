import { Component } from '@angular/core';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';
@Component({
  selector: 'app-filtering-block',
  templateUrl: './filtering-block.component.html',
  styleUrls: ['./filtering-block.component.scss'],
})
export class FilteringBlockComponent {
  youtubeService: YoutubeService;

  constructor(youtubeService: YoutubeService) {
    this.youtubeService = youtubeService;
  }
}

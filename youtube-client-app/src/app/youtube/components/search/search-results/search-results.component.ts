import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  youtubeService: YoutubeService;

  constructor(youtubeService: YoutubeService) {
    this.youtubeService = youtubeService;
  }

  ngOnInit(): void {
    this.youtubeService.resetCurrentVideoInfo();
  }
}

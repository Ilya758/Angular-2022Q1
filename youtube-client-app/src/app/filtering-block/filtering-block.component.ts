import { Component, Input, OnInit } from '@angular/core';
import { IFilterSettings } from './filtering-block.model';

@Component({
  selector: 'app-filtering-block',
  templateUrl: './filtering-block.component.html',
  styleUrls: ['./filtering-block.component.scss'],
})
export class FilteringBlockComponent implements OnInit {
  @Input() filterSettings!: IFilterSettings;

  constructor() {}

  ngOnInit(): void {}

  changeFilter(type: string, keyword = '') {
    switch (type) {
      case 'date': {
        this.filterSettings.dateByAsc = !this.filterSettings.dateByAsc;
        break;
      }

      case 'views': {
        this.filterSettings.viewsByAsc = !this.filterSettings.viewsByAsc;
        break;
      }

      case 'keyword': {
        this.filterSettings.keyword = keyword;
        break;
      }

      default: {
        break;
      }
    }
  }
}

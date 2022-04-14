import { Component, Input, OnInit } from '@angular/core';
import { IItem, TThumbnails } from '../../../models/search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  @Input() item!: IItem;
  constructor() {}

  resolutionChecker(thumbnails: TThumbnails) {
    const { maxres, high, medium, standard } = thumbnails;

    const resolution = [maxres, high, medium, standard].find((el) => el);

    return resolution;
  }
}

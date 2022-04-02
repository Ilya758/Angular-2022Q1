import { Component, Input, OnInit } from '@angular/core';
import { IItem } from '../../../models/search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnInit {
  @Input() item!: IItem;
  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { IItem } from '../search-item.model';
import { IResponse } from '../search-response.model';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  data!: IItem[];

  constructor() {}

  ngOnInit(): void {
    const URL =
      'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/angular/response.json';
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        this.data = Object.values(data)[3] as IItem[];
      })
      .catch((err) => console.log(err));
  }
}

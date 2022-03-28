import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  fakeFetched = false;

  filteringBlockIsVisible = false;

  filterSettings = {
    dateByAsc: false,
    viewsByAsc: false,
    keyword: '',
  };
}

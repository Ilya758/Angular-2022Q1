import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() fetched = false;
  @Output() fetchedChange = new EventEmitter();

  user = {
    query: '',
  };
  constructor() {}

  ngOnInit(): void {}

  submitForm(e: NgForm) {
    this.fetched = true;
    this.fetchedChange.emit(this.fetched);
  }
}

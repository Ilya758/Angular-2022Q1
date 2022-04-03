import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { LoginService } from 'src/app/auth/services/login.service';
import { IFilterSettings } from 'src/app/core/components/filtering-block/filtering-block.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() settingsVisible = false;
  @Input() fetched = false;
  @Output() fetchedChange = new EventEmitter();
  @Output() settingsVisibleChange = new EventEmitter();

  user = {
    query: '',
  };

  loginService!: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  ngOnInit(): void {}

  submitForm(e: NgForm) {
    this.fetched = true;
    this.fetchedChange.emit(this.fetched);
  }

  changeVisibility() {
    this.settingsVisible = !this.settingsVisible;
    this.settingsVisibleChange.emit(this.settingsVisible);
  }
}

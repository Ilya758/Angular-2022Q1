import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginService!: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  ngOnInit(): void {
    this.loginService.logged$.subscribe((predicate) => {
      this.loginService.isLoggedIn = predicate;
    });
  }
}

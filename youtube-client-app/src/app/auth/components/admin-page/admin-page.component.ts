import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

import { timer } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  loginService!: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  ngOnInit(): void {
    this.loginService.createdCard$.subscribe((predicate) => {
      this.loginService.cardIsCreated = predicate;

      if (this.loginService.cardIsCreated) {
        timer(1000).subscribe(
          () =>
            (this.loginService.cardIsCreated = !this.loginService.cardIsCreated)
        );
      }
    });
  }
}

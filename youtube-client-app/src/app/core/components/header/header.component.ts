import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounce, debounceTime, Subject } from 'rxjs';
import { LoginService } from 'src/app/auth/services/login.service';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  youtubeService: YoutubeService;

  loginService: LoginService;

  private searchText$ = new Subject<string>();

  constructor(
    loginService: LoginService,
    youtubeService: YoutubeService,
    private httpClient: HttpClient
  ) {
    this.loginService = loginService;
    this.youtubeService = youtubeService;
    this.httpClient = httpClient;
  }

  ngOnInit(): void {
    this.searchText$.pipe(debounceTime(1000)).subscribe(() => {
      this.youtubeService.userQuery.get(['request'])?.value.length >= 3 &&
        this.youtubeService.fetchData();
    });
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  search = (text: string) => {
    this.searchText$.next(text);
  };
}

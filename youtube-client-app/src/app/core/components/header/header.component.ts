import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, Observable, Subject } from 'rxjs';
import { ILoggedUser } from 'src/app/auth/models/user.model';
import { LoginService } from 'src/app/auth/services/login.service';
import { selectUserInfo } from 'src/app/redux/selectors/login.selectors';
import { IState } from 'src/app/redux/state.model';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  youtubeService: YoutubeService;

  loginService: LoginService;

  loggedUserInfo$!: Observable<ILoggedUser | null>;

  private searchText$ = new Subject<string>();

  constructor(
    loginService: LoginService,
    youtubeService: YoutubeService,
    private httpClient: HttpClient,
    private store: Store<IState>
  ) {
    this.loginService = loginService;

    this.youtubeService = youtubeService;

    this.httpClient = httpClient;

    this.loggedUserInfo$ = this.store.select(selectUserInfo);
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

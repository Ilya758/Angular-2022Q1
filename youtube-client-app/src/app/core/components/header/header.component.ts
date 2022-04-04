import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  constructor(loginService: LoginService, youtubeService: YoutubeService) {
    this.loginService = loginService;
    this.youtubeService = youtubeService;
  }

  ngOnInit(): void {}

  submitForm(e: FormGroup) {
    this.youtubeService.fetchData();
  }
}

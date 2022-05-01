import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { YoutubeModule } from './youtube/youtube.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HelpInterceptor } from './interceptors/help.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { loginReducer } from './redux/reducers/login.reducer';
import { youtubeReducer } from './redux/reducers/youtube.reducer';
import { filterReducer } from './redux/reducers/filter.reducer';
import { YoutubeEffects } from './redux/effects/youtube.effects';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HelpInterceptor, multi: true },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot({ loginReducer, youtubeReducer, filterReducer }),
    EffectsModule.forRoot([YoutubeEffects]),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}

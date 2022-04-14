import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../youtube/models/search-response.model';
import { YoutubeService } from '../youtube/services/youtube.service';

@Injectable()
export class HelpInterceptor implements HttpInterceptor {
  constructor(private youtubeService: YoutubeService) {}

  intercept(
    request: HttpRequest<IResponse>,
    next: HttpHandler
  ): Observable<HttpEvent<IResponse>> {
    const { userQuery } = this.youtubeService;

    const searchText = userQuery.get('request')?.value;

    let modifiedRequest: HttpRequest<IResponse>;

    if (request.url.match(/search$/gi)) {
      const searchKey = 'AIzaSyA-3syPpV3vkj00OaYHGM5EFOuDL33ipLg';

      modifiedRequest = request.clone({
        params: new HttpParams()
          .set('key', searchKey)
          .set('maxResults', '15')
          .set('q', searchText),
      });
    } else {
      const ids = request.params.get('id') as string;

      const statKey = 'AIzaSyCkBI2Fw7riRZ8AGbGuQ8XAOS-zKV2RW3A';

      modifiedRequest = request.clone({
        params: new HttpParams()
          .set('key', statKey)
          .set('maxResults', '15')
          .set('part', 'snippet,statistics')
          .set('id', ids)
          .set('q', searchText),
      });
    }

    return next.handle(modifiedRequest);
  }
}

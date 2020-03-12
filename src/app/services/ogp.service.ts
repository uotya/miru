import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpResponse,
  HttpClient
} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OgpWithFavicon } from '@interfaces/ogp-with-favicon';

@Injectable({
  providedIn: 'root'
})
export class OgpService {
  constructor(private http: HttpClient) {}

  getOGP(link: string): Observable<HttpResponse<OgpWithFavicon>> {
    const API = 'https://ogp-scraper.appspot.com/?url=';
    return this.http
      .get<any>(API + link, { observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      alert(error.error.message);
    } else {
      alert(
        `エラー番号(${error.status}): 正しいURLが入力されているか確認してください`
      );
    }
    return throwError('エラーが発生しました');
  }
}

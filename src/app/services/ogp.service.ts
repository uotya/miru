import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpResponse,
  HttpClient
} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { OGP } from '@interfaces/ogp';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OgpService {
  constructor(private http: HttpClient) {}

  getOGP(link: any): Observable<HttpResponse<OGP>> {
    const API = 'https://ogp-api.appspot.com/?url=';
    return this.http
      .get<OGP>(API + link, { observe: 'response' })
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

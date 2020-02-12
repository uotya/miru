import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingSource = new Subject<boolean>();
  isLoading$ = this.loadingSource.asObservable().pipe(delay(0));

  constructor() {}

  toggleLoading(status: boolean) {
    this.loadingSource.next(status);
  }
}

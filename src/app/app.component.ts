import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading$ = this.loadingService.isLoading$;

  constructor(private loadingService: LoadingService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.toggleLoading(true);
      }
    });
  }
}

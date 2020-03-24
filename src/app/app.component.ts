import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading$ = this.loadingService.isLoading$;

  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.toggleLoading(true);
      }
      if (event instanceof NavigationEnd) {
        this.title.setTitle('リンク集メーカーMIRU');
        this.meta.updateTag({
          property: 'og:title',
          content: 'リンク集メーカーMIRU'
        });
        this.meta.updateTag({
          property: 'og:description',
          content:
            'リンク集メーカーMIRUならTwitterアカウントだけですぐに見やすいリンク集が作れます'
        });
        this.meta.updateTag({
          property: 'og:url',
          content: 'https://miru-2ac6c.web.app'
        });
      }
    });
  }
}

import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { tap, take } from 'rxjs/operators';
import { ArticleService } from '../services/article.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUser: boolean;
  avatarURL: string;
  isLoading: boolean;

  user$ = this.authService.afUser$.pipe(
    tap(user => {
      this.isUser = true;
      this.articleService
        .getUserData(user.uid)
        .pipe(take(1))
        .subscribe(result => {
          this.avatarURL = result.avatarURL;
        });
    })
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private articleService: ArticleService
  ) {}

  ngOnInit() {}

  login() {
    this.isLoading = true;
    this.authService.login().then(() => {
      this.ngZone.run(() => {
        this.isLoading = false;
        this.router.navigateByUrl('/article/create');
      });
    });
  }

  logout() {
    this.authService.logout();
  }
}

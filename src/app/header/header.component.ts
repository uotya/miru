import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
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
      if (user) {
        this.authService.getUserData(user.uid).subscribe(result => {
          this.avatarURL = result && result.avatarURL;
        });
        this.authService.createUser(user.uid);
      }
    })
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
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

import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserData } from '../interfaces/user';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserChecked: boolean;
  isLoading: boolean;

  user$ = this.authService.afUser$.pipe(
    tap(() => {
      this.isUserChecked = true;
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
        this.router.navigateByUrl('/create');
      });
    });
  }

  logout() {
    this.authService.logout();
  }

  addSelected($event) {
    const selected = document.getElementById('selected');
    selected.removeAttribute('id');
    $event.target.setAttribute('id', 'selected');
  }
}

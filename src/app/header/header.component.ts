import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$ = this.authService.afUser$;
  isLoading: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.isLoading = true;
    this.authService.login().finally(() => {
      this.isLoading = false;
      this.router.navigateByUrl('/create');
    });
  }

  logout() {
    this.authService.logout();
  }
}

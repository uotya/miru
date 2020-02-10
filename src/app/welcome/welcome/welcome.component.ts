import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private loadingService: LoadingService
  ) {}
  ngOnInit() {
    setTimeout(() => {
      this.loadingService.toggleLoading(false);
    }, 50);
  }

  login() {
    this.authService.login().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/article/create');
      });
    });
  }
}

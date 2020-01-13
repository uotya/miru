import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}
  ngOnInit() {}

  login() {
    this.authService.login().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/create');
      });
    });
  }
}

import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.scss']
})
export class DeleteAccountDialogComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  deleteAccount() {
    this.authService
      .deleteUser()
      .then(() => {
        this.dialog.closeAll();
        this.router.navigateByUrl('/');
        this.snackBar.open(
          '削除されました。ご利用ありがとうございました。',
          null,
          {
            duration: 6000
          }
        );
      })
      .catch(() => {
        this.dialog.closeAll();
        this.snackBar.open(
          '失敗しました。ログインし直してから再度お試しください。',
          null,
          {
            duration: 6000
          }
        );
      });
  }
}

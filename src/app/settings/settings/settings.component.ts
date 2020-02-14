import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/services/auth.service';
import { Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  userId = this.authService.user.uid;
  user$ = this.authService.getUserData(this.userId);

  nameForm = new FormControl('', [
    Validators.required,
    Validators.maxLength(30)
  ]);

  constructor(
    private loadingService: LoadingService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadingService.toggleLoading(false);
  }

  changeUserName() {
    const newName: string = this.nameForm.value;
    this.authService.changeUserName(this.userId, newName);
    this.snackBar.open('変更されました！', null, {
      duration: 2000
    });
  }

  deleteAccount() {
    this.dialog.open(DeleteAccountDialogComponent, {
      restoreFocus: false
    });
  }
}

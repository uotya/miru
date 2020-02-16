import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/services/auth.service';
import { Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  userId = this.authService.user.uid;
  user$ = this.userService.getUserData(this.userId);
  imageChangedEvent = '';
  croppedImage = '';

  nameForm = new FormControl('', [
    Validators.required,
    Validators.maxLength(30)
  ]);

  constructor(
    private loadingService: LoadingService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadingService.toggleLoading(false);
  }

  changeUserName() {
    const newName: string = this.nameForm.value;
    this.userService.changeUserName(this.userId, newName);
    this.snackBar.open('変更されました！', null, {
      duration: 2000
    });
  }

  fileChangeEvent(event) {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  loadImageFailed() {
    alert('画像の読み込みに失敗しました');
  }
  resetInput(imageSelecter) {
    this.imageChangedEvent = '';
    imageSelecter.value = '';
  }

  changeAvatar(imageSelecter) {
    if (this.croppedImage) {
      this.userService
        .changeUserAvatar(this.userId, this.croppedImage)
        .then(() => {
          this.snackBar.open('変更されました！', null, {
            duration: 2000
          });
          this.imageChangedEvent = '';
          imageSelecter.value = '';
        });
    }
  }

  deleteAccount() {
    this.dialog.open(DeleteAccountDialogComponent, {
      restoreFocus: false
    });
  }
}
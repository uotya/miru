import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [SettingsComponent, DeleteAccountDialogComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatTabsModule,
    SharedModule,
    MatInputModule,
    ImageCropperModule
  ]
})
export class SettingsModule {}

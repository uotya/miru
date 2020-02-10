import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  AngularFireFunctionsModule,
  FUNCTIONS_REGION
} from '@angular/fire/functions';
import { environment } from '../environments/environment';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { MatTooltipModule } from '@angular/material/tooltip';
import localeJa from '@angular/common/locales/ja';
import { registerLocaleData } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

registerLocaleData(localeJa);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    MatToolbarModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,
    SharedModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AuthGuard,
    { provide: LOCALE_ID, useValue: 'ja-JP' },
    { provide: FUNCTIONS_REGION, useValue: 'asia-northeast1' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

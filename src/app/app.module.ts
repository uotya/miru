import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  AngularFireFunctionsModule,
  FUNCTIONS_REGION
} from '@angular/fire/functions';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import localeJa from '@angular/common/locales/ja';
import { registerLocaleData } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgAisModule } from 'angular-instantsearch';
import { SearchInputComponent } from './search-input/search-input.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ArticlePipe } from './pipes/article.pipe';
import { NgxStripeModule } from 'ngx-stripe';
import { DonateComponent } from './donate/donate.component';
import { MatStepperModule } from '@angular/material/stepper';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(localeJa);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    SearchInputComponent,
    SearchResultComponent,
    ArticlePipe,
    DonateComponent
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
    SharedModule,
    MatProgressSpinnerModule,
    NgAisModule.forRoot(),
    NgxStripeModule.forRoot('pk_test_Yf2x5GaBCKZJoR4NDrjHQ08100VogK81dh'),
    MatStepperModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    { provide: LOCALE_ID, useValue: 'ja-JP' },
    { provide: FUNCTIONS_REGION, useValue: 'asia-northeast1' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

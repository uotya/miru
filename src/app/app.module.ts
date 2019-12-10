import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
=======

@NgModule({
  declarations: [
    // ここにぶら下げるModuleを追加
>>>>>>> origin/master
    AppComponent
  ],
  imports: [
    BrowserModule,
<<<<<<< HEAD
    AppRoutingModule,
    BrowserAnimationsModule
=======
    AppRoutingModule
>>>>>>> origin/master
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

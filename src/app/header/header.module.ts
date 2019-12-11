import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header/header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HeaderComponent
  }
];

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    HeaderRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HeaderModule { }
export class MyAppModule {}

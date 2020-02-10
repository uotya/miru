import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ItemCardComponent } from './item-card/item-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RankingComponent } from './ranking/ranking.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from '../welcome/login-dialog/login-dialog.component';
import { UserComponent } from './user/user.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    ItemCardComponent,
    RankingComponent,
    LoginDialogComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    InfiniteScrollModule,
    MatDividerModule
  ],
  exports: [
    ItemCardComponent,
    RankingComponent,
    LoginDialogComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatCardModule
  ],
  entryComponents: [LoginDialogComponent]
})
export class SharedModule {}

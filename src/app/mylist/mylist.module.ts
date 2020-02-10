import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MylistRoutingModule } from './mylist-routing.module';
import { MylistComponent } from './mylist/mylist.component';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [MylistComponent],
  imports: [
    CommonModule,
    MylistRoutingModule,
    SharedModule,
    InfiniteScrollModule
  ]
})
export class MylistModule {}

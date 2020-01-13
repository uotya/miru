import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MylistRoutingModule } from './mylist-routing.module';
import { MylistComponent } from './mylist/mylist.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, MylistRoutingModule, MylistComponent]
})
export class MylistModule {}

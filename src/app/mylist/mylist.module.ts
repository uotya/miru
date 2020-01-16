import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MylistRoutingModule } from './mylist-routing.module';
import { MylistComponent } from './mylist/mylist.component';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [MylistComponent],
  imports: [CommonModule, MylistRoutingModule, SharedModule, MatCardModule]
})
export class MylistModule {}

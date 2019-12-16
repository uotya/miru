import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntlRoutingModule } from './intl-routing.module';
import { TosComponent } from './tos/tos.component';

@NgModule({
  declarations: [TosComponent],
  imports: [CommonModule, IntlRoutingModule]
})
export class IntlModule {}

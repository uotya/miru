import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntlRoutingModule } from './intl-routing.module';
import { TosComponent } from './tos/tos.component';
import { LegalComponent } from './legal/legal.component';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [TosComponent, LegalComponent, HelpComponent],
  imports: [CommonModule, IntlRoutingModule]
})
export class IntlModule {}

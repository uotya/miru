import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntlRoutingModule } from './intl-routing.module';
import { TosComponent } from './tos/tos.component';
import { LegalComponent } from './legal/legal.component';
import { HelpComponent } from './help/help.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [TosComponent, LegalComponent, HelpComponent],
  imports: [CommonModule, IntlRoutingModule, MatTabsModule]
})
export class IntlModule {}

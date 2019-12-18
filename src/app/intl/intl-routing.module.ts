import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TosComponent } from './tos/tos.component';
import { LegalComponent } from './legal/legal.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [
  {
    path: 'tos',
    pathMatch: 'full',
    component: TosComponent
  },
  {
    path: 'legal',
    pathMatch: 'full',
    component: LegalComponent
  },
  {
    path: 'help',
    pathMatch: 'full',
    component: HelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntlRoutingModule {}

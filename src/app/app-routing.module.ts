import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./create/create.module').then(m => m.CreateModule)
  },
  {
    path: 'intl',
    loadChildren: () => import('./intl/intl.module').then(m => m.IntlModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

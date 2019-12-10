import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'welcome',
    loadChildren:  () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'tos',
    loadChildren:  () => import('./tos/tos.module').then(m => m.TosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome/welcome.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent
  },
  {
    path: 'tos',
    loadChildren: () => import('./tos/tos.module').then(m => m.TosModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

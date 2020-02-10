import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { FormGuard } from '../guards/form.guard';
import { CreatedComponent } from './created/created.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    canDeactivate: [FormGuard]
  },
  {
    path: 'created',
    component: CreatedComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'edit',
    component: CreateComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    canDeactivate: [FormGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule {}

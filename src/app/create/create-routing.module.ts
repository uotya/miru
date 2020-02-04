import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { FormGuard } from '../guards/form.guard';
import { CreatedComponent } from './created/created.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
    canDeactivate: [FormGuard]
  },
  {
    path: 'created',
    component: CreatedComponent
  },
  {
    path: 'edit',
    component: CreateComponent,
    canDeactivate: [FormGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule {}

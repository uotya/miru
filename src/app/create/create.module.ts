import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create/create.component';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormComponent } from './form/form.component';
import { CreatedComponent } from './created/created.component';
import { HttpClientModule } from '@angular/common/http';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { DeletedComponent } from './deleted/deleted.component';

@NgModule({
  declarations: [
    CreateComponent,
    FormComponent,
    CreatedComponent,
    DeleteDialogComponent,
    DeletedComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    SharedModule,
    MatInputModule,
    MatTooltipModule,
    HttpClientModule
  ],
  entryComponents: [DeleteDialogComponent]
})
export class CreateModule {}

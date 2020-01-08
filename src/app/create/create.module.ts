import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create/create.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MylistComponent } from './mylist/mylist.component';
import { FormComponent } from './form/form.component';
import { CreatedComponent } from './created/created.component';

@NgModule({
  declarations: [
    CreateComponent,
    MylistComponent,
    FormComponent,
    CreatedComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule
  ]
})
export class CreateModule {}

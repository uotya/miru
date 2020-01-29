import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @ViewChild('formElement', { static: false }) formElement: FormComponent;
  created: boolean;
  deleted: boolean;

  constructor() {}

  ngOnInit() {}
}

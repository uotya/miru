import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @ViewChild('formElement') formElement: FormComponent;
  created: boolean;
  deleted: boolean;

  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle('記事の作成 | MIRU');
  }

  changeTitle() {
    this.title.setTitle('記事の編集 | MIRU');
  }
}

import { Component, OnInit } from '@angular/core';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-created',
  templateUrl: './created.component.html',
  styleUrls: ['./created.component.scss']
})
export class CreatedComponent implements OnInit {
  constructor(private createComponent: CreateComponent) {}

  ngOnInit() {}

  more() {
    this.createComponent.created = false;
  }
}

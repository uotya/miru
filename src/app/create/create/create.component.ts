import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @ViewChild('formElement') formElement: FormComponent;
  created: boolean;
  deleted: boolean;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.toggleLoading(false);
  }
}

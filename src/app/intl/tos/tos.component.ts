import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-tos',
  templateUrl: './tos.component.html',
  styleUrls: ['./tos.component.scss']
})
export class TosComponent implements OnInit {
  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.toggleLoading(false);
  }
}

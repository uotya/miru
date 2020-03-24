import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tos',
  templateUrl: './tos.component.html',
  styleUrls: ['./tos.component.scss']
})
export class TosComponent implements OnInit {
  constructor(private loadingService: LoadingService, private title: Title) {}

  ngOnInit() {
    this.title.setTitle('利用規約 | MIRU');
    this.loadingService.toggleLoading(false);
  }
}

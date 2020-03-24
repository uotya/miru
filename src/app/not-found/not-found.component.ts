import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  constructor(private loadingService: LoadingService, private title: Title) {}

  ngOnInit() {
    this.title.setTitle('ページが見つかりません | MIRU');
    this.loadingService.toggleLoading(false);
  }
}

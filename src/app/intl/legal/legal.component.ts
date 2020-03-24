import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent implements OnInit {
  constructor(private loadingService: LoadingService, private title: Title) {}

  ngOnInit() {
    this.title.setTitle('特定商取引法に基づく表示 | MIRU');
    this.loadingService.toggleLoading(false);
  }
}

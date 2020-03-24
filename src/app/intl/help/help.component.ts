import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  constructor(private loadingService: LoadingService, private title: Title) {}

  ngOnInit() {
    this.loadingService.toggleLoading(false);
    this.title.setTitle('使い方 | MIRU');
  }
}

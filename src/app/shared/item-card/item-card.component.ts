import { Component, OnInit, Input } from '@angular/core';
import { ArticleWithUser } from 'src/app/interfaces/article-with-user';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() card: ArticleWithUser;

  constructor() {}

  ngOnInit() {}
}

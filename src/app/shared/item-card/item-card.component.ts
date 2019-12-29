import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/interfaces/card';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() card: Card;

  constructor() {}

  ngOnInit() {}
}

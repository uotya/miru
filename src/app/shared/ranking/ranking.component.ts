import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  card: Article | User = {
    avatarURL:
      'https://saruwakakun.com/wp-content/uploads/2017/06/bdrArtwork.jpg',
    userName: 'しばいぬ',
    userId: 'temporary',
    title:
      '初めて犬を飼うときに役に立つリンクをまとめました初めて犬を飼うときに役に立つリンクをまとめました',
    description: 'temporary',
    links: [],
    thumbURL:
      'https://saruwakakun.com/wp-content/uploads/2017/06/dogg-03-min.png',
    favorite: 100
  };

  constructor() {}

  ngOnInit() {}
}

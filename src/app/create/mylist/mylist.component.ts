import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss']
})
export class MylistComponent implements OnInit {
  card: Article = {
    avatarURL:
      'https://saruwakakun.com/wp-content/uploads/2017/06/bdrArtwork.jpg',
    userName: 'しばいぬ',
    userId: 'temporary',
    title:
      '初めて犬を飼うときに役に立つリンクをまとめました初めて犬を飼うときに役に立つリンクをまとめました',
    description: 'temporary',
    link: 'temporary',
    comment: 'temporary',
    thumbURL:
      'https://saruwakakun.com/wp-content/uploads/2017/06/dogg-03-min.png',
    favorite: 100
  };

  constructor() {}

  ngOnInit() {}
}

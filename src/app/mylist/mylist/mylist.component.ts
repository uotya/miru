import { Component, OnInit } from '@angular/core';
import { ArticleWithUser } from 'src/app/interfaces/article-with-user';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss']
})
export class MylistComponent implements OnInit {
  card: ArticleWithUser = {
    author: {
      uid: 'temporary',
      userName: 'しばいぬ',
      avatarURL:
        'https://saruwakakun.com/wp-content/uploads/2017/06/bdrArtwork.jpg'
    },
    authorId: 'temporary',
    createdAt: new Date(),
    title:
      '初めて犬を飼うときに役に立つリンクをまとめました初めて犬を飼うときに役に立つリンクをまとめました',
    description: 'temporary',
    links: [],
    thumbnailURL:
      'https://saruwakakun.com/wp-content/uploads/2017/06/dogg-03-min.png',
    favorite: 100
  };

  constructor() {}

  ngOnInit() {}
}

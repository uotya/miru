import { Component, OnInit } from '@angular/core';
import { ArticleWithUser } from 'src/app/interfaces/article-with-user';
import { Article } from 'src/app/interfaces/article';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  articles$: Observable<
    ArticleWithUser[]
  > = this.articleService.getPopularArticles();

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

  constructor(private articleService: ArticleService) {}

  ngOnInit() {}
}

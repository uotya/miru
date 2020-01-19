import { Component, OnInit } from '@angular/core';
import { ArticleWithUser } from 'src/app/interfaces/article-with-user';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  articles$: Observable<
    ArticleWithUser[]
  > = this.articleService.getPopularArticles().pipe(take(1));

  constructor(private articleService: ArticleService) {}

  ngOnInit() {}
}

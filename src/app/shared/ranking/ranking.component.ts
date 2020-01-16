import { Component, OnInit } from '@angular/core';
import { ArticleWithUser } from 'src/app/interfaces/article-with-user';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  articles$: Observable<
    ArticleWithUser[]
  > = this.articleService.getPopularArticles();

  constructor(private articleService: ArticleService) {}

  ngOnInit() {}
}

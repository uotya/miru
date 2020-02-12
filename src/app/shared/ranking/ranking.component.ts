import { Component, OnInit } from '@angular/core';
import { ArticleWithUser } from '@interfaces/article-with-user';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { take, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  articles$: Observable<
    ArticleWithUser[]
  > = this.articleService.getPopularArticles().pipe(
    take(1),
    tap(() => this.loadingService.toggleLoading(false))
  );

  constructor(
    private articleService: ArticleService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadingService.toggleLoading(true);
  }
}

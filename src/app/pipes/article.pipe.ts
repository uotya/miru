import { tap, take } from 'rxjs/operators';
import { ArticleWithUser } from '@interfaces/article-with-user';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { Pipe, PipeTransform } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Pipe({
  name: 'article'
})
export class ArticlePipe implements PipeTransform {
  constructor(
    private articleService: ArticleService,
    private loadingService: LoadingService
  ) {}

  transform(slimArticles: any[]): Observable<ArticleWithUser[]> {
    if (slimArticles.length) {
      const ids = slimArticles.map(article => article.articleId);
      return this.articleService.getUsersArticles(ids).pipe(
        take(1),
        tap(() => this.loadingService.toggleLoading(false))
      );
    } else {
      this.loadingService.toggleLoading(false);
    }
  }
}

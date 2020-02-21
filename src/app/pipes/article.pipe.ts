import { ArticleWithUser } from '@interfaces/article-with-user';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'article'
})
export class ArticlePipe implements PipeTransform {
  constructor(private articleService: ArticleService) {}

  transform(slimArticles: any[]): Observable<ArticleWithUser[]> {
    if (slimArticles.length) {
      const ids = slimArticles.map(article => article.articleId);
      return this.articleService.getUsersArticles(ids);
    }
  }
}

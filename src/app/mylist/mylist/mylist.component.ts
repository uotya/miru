import { Component, OnInit } from '@angular/core';
import { ArticleWithUser } from '@interfaces/article-with-user';
import { ArticleService } from 'src/app/services/article.service';
import { take } from 'rxjs/operators';
import { firestore } from 'firebase';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss']
})
export class MylistComponent implements OnInit {
  latestDoc: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
  articles: ArticleWithUser[] = [];
  isComplete: boolean;

  constructor(
    private articleService: ArticleService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.loadingService.toggleLoading(true);
    if (this.isComplete) {
      this.loadingService.toggleLoading(false);
      return;
    }
    this.articleService
      .getMyArticles(this.latestDoc)
      .pipe(take(1))
      .subscribe(({ latestDoc, ArticlesData }) => {
        if (ArticlesData) {
          if (!ArticlesData.length) {
            this.isComplete = true;
            this.loadingService.toggleLoading(false);
            return;
          }
          this.latestDoc = latestDoc;
          ArticlesData.map(doc => this.articles.push(doc));
          this.loadingService.toggleLoading(false);
        }
      });
  }
}

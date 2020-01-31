import { Component, OnInit } from '@angular/core';
import { ArticleWithUser } from 'src/app/interfaces/article-with-user';
import { ArticleService } from 'src/app/services/article.service';
import { take } from 'rxjs/operators';
import { firestore } from 'firebase';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss']
})
export class MylistComponent implements OnInit {
  latestDoc: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
  articles: ArticleWithUser[] = [];
  isComplete: boolean;

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    if (this.isComplete) {
      return;
    }
    this.articleService
      .getMyArticles(this.latestDoc)
      .pipe(take(1))
      .subscribe(({ latestDoc, ArticlesData }) => {
        if (ArticlesData) {
          if (!ArticlesData.length) {
            this.isComplete = true;
            return;
          }
          this.latestDoc = latestDoc;
          ArticlesData.map(doc => this.articles.push(doc));
        }
      });
  }
}

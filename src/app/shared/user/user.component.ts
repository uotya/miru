import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleWithUser } from '@interfaces/article-with-user';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userId: string;
  latestDoc: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
  articles: ArticleWithUser[] = [];
  isComplete: boolean;
  userName: string;

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.pipe(take(1)).subscribe(params => {
      this.userId = params.get('id');
      this.getArticles();
      this.authService
        .getUserData(this.userId)
        .pipe(take(1))
        .subscribe(data => {
          this.userName = data.userName;
        });
    });
  }

  getArticles() {
    if (this.isComplete) {
      return;
    }
    this.articleService
      .getUserArticles(this.userId, this.latestDoc)
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

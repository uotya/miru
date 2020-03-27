import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleWithUser } from '@interfaces/article-with-user';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase';
import { UserService } from 'src/app/services/user.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Title, Meta } from '@angular/platform-browser';

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
    private route: ActivatedRoute,
    private userService: UserService,
    private loadingService: LoadingService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.route.queryParamMap.pipe(take(1)).subscribe(params => {
      this.userId = params.get('id');
      this.getArticles();
      this.userService
        .getUserData(this.userId)
        .pipe(take(1))
        .subscribe(data => {
          this.title.setTitle(`${data.userName}の記事一覧 | MIRU`);
          this.meta.updateTag({
            property: 'og:title',
            content: `${data.userName}の記事一覧 | MIRU`
          });
          this.meta.updateTag({
            property: 'og:url',
            content: `https://miru.page/user?id=${data.uid}`
          });
          this.userName = data.userName;
        });
    });
  }

  getArticles() {
    this.loadingService.toggleLoading(true);
    if (this.isComplete) {
      this.loadingService.toggleLoading(false);
      return;
    }
    this.articleService
      .getUserArticles(this.userId, this.latestDoc)
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

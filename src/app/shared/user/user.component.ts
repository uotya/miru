import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleWithUser } from 'src/app/interfaces/article-with-user';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  articles$: Observable<ArticleWithUser[]>;
  userId: string;
  userName: string;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.pipe(take(1)).subscribe(params => {
      this.userId = params.get('id');
      this.articles$ = this.articleService
        .getUserArticles(this.userId)
        .pipe(take(1));
      this.articleService
        .getUserData(this.userId)
        .pipe(take(1))
        .subscribe(data => {
          this.userName = data.userName;
        });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-created',
  templateUrl: './created.component.html',
  styleUrls: ['./created.component.scss']
})
export class CreatedComponent implements OnInit {
  articleId: string;
  title: string;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.getArticle();
  }

  getArticle() {
    this.route.queryParamMap.pipe(take(1)).subscribe(params => {
      this.articleId = params.get('id');
      this.articleService
        .getArticleOnly(this.articleId)
        .pipe(take(1))
        .subscribe(result => {
          this.title = result.title;
        });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleWithUser } from 'src/app/interfaces/article-with-user';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: ArticleWithUser;
  isLiked: boolean;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getArticle();
  }

  getArticle(): void {
    const id = this.route.snapshot.paramMap.get('articleId');
    this.articleService
      .getDiscreteArticle(id)
      .subscribe(article => (this.article = article));
  }

  goBack(): void {
    this.location.back();
  }
}

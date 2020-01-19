import { Component, OnInit } from '@angular/core';
import { ArticleWithUser } from 'src/app/interfaces/article-with-user';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss']
})
export class MylistComponent implements OnInit {
  articles$: Observable<
    ArticleWithUser[]
  > = this.articleService.getMyArticles().pipe(take(1));

  constructor(private articleService: ArticleService) {}

  ngOnInit() {}
}

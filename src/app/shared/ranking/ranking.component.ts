import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  UrlSegment
} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArticleWithUser } from '@interfaces/article-with-user';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { take, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { Title, Meta } from '@angular/platform-browser';
import * as _ from 'lodash';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  articles$: Observable<
    ArticleWithUser[]
  > = this.articleService.getPopularArticles().pipe(
    take(1),
    tap(() => this.loadingService.toggleLoading(false))
  );

  constructor(
    private articleService: ArticleService,
    private loadingService: LoadingService,
    private title: Title,
    private meta: Meta,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadingService.toggleLoading(true);
    const path: string[] = _.map(
      this.route.snapshot.pathFromRoot,
      (ars: ActivatedRouteSnapshot) => {
        if (_.isNil(ars.url) || _.isEmpty(ars.url)) {
          return null;
        }
        return (_.first(ars.url) as UrlSegment).path as string;
      }
    ).filter(val => val);
    if (path[0] === 'ranking') {
      this.title.setTitle('人気の投稿 | MIRU');
      this.meta.updateTag({
        property: 'og:title',
        content: '人気の投稿 | MIRU'
      });
    }
  }
}

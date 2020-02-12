import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleWithUser } from '@interfaces/article-with-user';
import { LikeService } from 'src/app/services/like.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from 'src/app/welcome/login-dialog/login-dialog.component';
import { take } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: ArticleWithUser;
  isLiked: boolean;
  favorite: number;
  isMyArticle: boolean;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private likeService: LikeService,
    private authService: AuthService,
    private dialog: MatDialog,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.getArticle();
  }

  getArticle(): void {
    const id = this.route.snapshot.paramMap.get('articleId');
    this.articleService
      .getDiscreteArticle(id)
      .pipe(take(2))
      .subscribe(article => {
        this.article = article;
        this.loadingService.toggleLoading(false);
        this.favorite = this.article.favorite;
        if (
          this.authService.user &&
          this.authService.user.uid === this.article.authorId
        ) {
          this.isMyArticle = true;
        }
        if (this.authService.user) {
          this.likeService
            .isLiked(this.article.articleId, this.authService.user.uid)
            .pipe(take(1))
            .subscribe(result => {
              this.isLiked = result;
            });
        }
      });
  }

  isLink(link: string) {
    if (link.match(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/)) {
      return true;
    } else {
      return false;
    }
  }

  clickedLike(article: ArticleWithUser) {
    const articleId = article.articleId;
    const user = this.authService.user;
    if (user && !this.isLiked) {
      this.likeService.likeArticle(articleId, user.uid);
      this.favorite++;
      this.isLiked = true;
    } else if (user && this.isLiked) {
      this.likeService.deleteLikeArticle(articleId, user.uid);
      this.favorite--;
      this.isLiked = false;
    } else {
      this.dialog.open(LoginDialogComponent, {
        restoreFocus: false
      });
    }
  }

  updateAvatar() {
    this.authService.updateAvatar(this.article.authorId);
  }
}

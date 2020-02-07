import { Component, OnInit, Input } from '@angular/core';
import { ArticleWithUser } from 'src/app/interfaces/article-with-user';
import { LikeService } from 'src/app/services/like.service';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from 'src/app/welcome/login-dialog/login-dialog.component';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() card: ArticleWithUser;
  isLiked: boolean;
  favorite: number;

  constructor(
    private likeService: LikeService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.favorite = this.card.favorite;
    if (this.authService.user) {
      this.likeService
        .isLiked(this.card.articleId, this.authService.user.uid)
        .pipe(take(1))
        .subscribe(result => {
          this.isLiked = result;
          this.favorite = this.card.favorite;
        });
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
      this.dialog.open(LoginDialogComponent);
    }
  }

  updateAvatar() {
    this.authService.updateAvatar(this.card.authorId);
  }
}

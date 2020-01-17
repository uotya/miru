import { Component, OnInit, Input } from '@angular/core';
import { ArticleWithUser } from 'src/app/interfaces/article-with-user';
import { LikeService } from 'src/app/services/like.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() card: ArticleWithUser;
  isLiked: boolean;
  uid = this.authService.user.uid;

  constructor(
    private likeService: LikeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.likeService
      .isLiked(this.card.articleId, this.uid)
      .subscribe(result => {
        this.isLiked = result;
      });
  }

  clickedLike(article: ArticleWithUser) {
    const articleId = article.articleId;
    if (!this.isLiked) {
      this.likeService.likeArticle(articleId, this.uid);
    } else {
      this.likeService.deleteLikeArticle(articleId, this.uid);
    }
  }

  checkLiked(articleId: string) {
    this.likeService.isLiked(articleId, this.uid).subscribe(result => {
      this.isLiked = result;
    });
  }
}

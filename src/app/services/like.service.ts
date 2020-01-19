import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  constructor(private db: AngularFirestore) {}

  likeArticle(articleId: string, userId: string): Promise<void> {
    return this.db
      .doc(`users/${userId}/likeArticles/${articleId}`)
      .set({ articleId });
  }

  isLiked(articleId: string, userId: string): Observable<boolean> {
    return this.db
      .doc(`users/${userId}/likeArticles/${articleId}`)
      .valueChanges()
      .pipe(map(doc => !!doc));
  }

  deleteLikeArticle(articleId: string, userId: string): Promise<void> {
    return this.db.doc(`users/${userId}/likeArticles/${articleId}`).delete();
  }
}

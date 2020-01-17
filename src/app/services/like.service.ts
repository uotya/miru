import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private db: AngularFirestore) {}

  createArticle(article: Article) {
    const id = this.db.createId();
    return this.db.doc(`articles/${id}`).set(article);
  }
}

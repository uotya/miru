import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Article } from '../interfaces/article';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

  createArticle(article: Omit<Article, ''>) {
    const id = this.db.createId();
    return this.db
      .doc(`articles/${id}`)
      .set(article)
      .then(() => {
        this.snackBar.open('公開されました🥳', null, {
          duration: 2000
        });
      });
  }
}

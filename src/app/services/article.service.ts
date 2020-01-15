import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Article } from '../interfaces/article';
import { Observable, combineLatest, of } from 'rxjs';
import { ArticleWithUser } from '../interfaces/article-with-user';
import { switchMap, map } from 'rxjs/operators';
import { UserData } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private db: AngularFirestore) {}

  createArticle(article: Article) {
    const id = this.db.createId();
    return this.db.doc(`articles/${id}`).set(article);
  }

  getPopularArticles(): Observable<ArticleWithUser[]> {
    let articles: Article[];
    return this.db
      .collection<Article>(`articles`, ref => {
        return ref.orderBy('favorite', 'desc').limit(6);
      })
      .valueChanges()
      .pipe(
        switchMap((docs: Article[]) => {
          articles = docs;
          if (articles.length) {
            const authorIds: string[] = articles
              .filter((article, index, self) => {
                return (
                  self.findIndex(item => article.authorId === item.authorId) ===
                  index
                );
              })
              .map(article => article.authorId);
            return combineLatest(
              authorIds.map(uid => {
                return this.db.doc<UserData>(`users/${uid}`).valueChanges();
              })
            );
          } else {
            return of([]);
          }
        }),
        map((users: UserData[]) => {
          return articles.map(article => {
            const result: ArticleWithUser = {
              ...article,
              author: users.find(user => user.uid === article.authorId)
            };
            if (result.thumbnailURL == null) {
              result.thumbnailURL = '/assets/images/thumbnail.png';
            }
            return result;
          });
        })
      );
  }
}

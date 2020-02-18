import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Article } from '@interfaces/article';
import { Observable, combineLatest, of } from 'rxjs';
import { ArticleWithUser } from '@interfaces/article-with-user';
import { switchMap, map, tap, take } from 'rxjs/operators';
import { UserData } from '@interfaces/user';
import { AuthService } from './auth.service';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private db: AngularFirestore, private authService: AuthService) {}

  createArticle(
    article: Omit<Article, 'articleId' | 'createdAt' | 'updatedAt'>
  ) {
    const articleId = this.db.createId();
    this.db.doc(`articles/${articleId}`).set({
      articleId,
      ...article,
      createdAt: firestore.Timestamp.now(),
      updatedAt: firestore.Timestamp.now()
    });
    return articleId;
  }

  updateArticle(
    article: Pick<Article, 'articleId' | 'title' | 'links' | 'description'>
  ): Promise<void> {
    return this.db.doc(`articles/${article.articleId}`).update({
      ...article,
      updatedAt: firestore.Timestamp.now()
    });
  }

  deleteArticle(articleId: string): Promise<void> {
    return this.db.doc(`articles/${articleId}`).delete();
  }

  getArticleOnly(articleId: string) {
    return this.db.doc<Article>(`articles/${articleId}`).valueChanges();
  }

  getArticles(
    sorted: AngularFirestoreCollection<Article>
  ): Observable<{
    latestDoc: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
    ArticlesData: ArticleWithUser[];
  }> {
    let articles: Article[];
    let latestDoc: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
    return sorted.get({ source: 'server' }).pipe(
      map(result => result.docs),
      switchMap(docs => {
        latestDoc = docs[docs.length - 1];
        articles = docs.map(doc => doc.data() as Article);
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
        const ArticlesData = articles.map(article => {
          const result: ArticleWithUser = {
            ...article,
            author: users.find(user => user.uid === article.authorId)
          };
          if (result.thumbnailURL == null) {
            result.thumbnailURL = '/assets/images/thumbnail.png';
          }
          return result;
        });
        return {
          ArticlesData,
          latestDoc
        };
      })
    );
  }

  getPopularArticles(): Observable<ArticleWithUser[]> {
    const sorted = this.db.collection<ArticleWithUser>(`articles`, ref => {
      return ref.orderBy('favorite', 'desc').limit(6);
    });
    return this.getArticles(sorted).pipe(
      map(result => {
        return result.ArticlesData;
      })
    );
  }

  getMyArticles(
    startAt: firestore.QueryDocumentSnapshot<firestore.DocumentData>
  ): Observable<{
    latestDoc: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
    ArticlesData: ArticleWithUser[];
  }> {
    const sorted = this.db.collection<ArticleWithUser>(`articles`, ref => {
      if (startAt) {
        return ref
          .where('authorId', '==', this.authService.user.uid)
          .orderBy('updatedAt', 'desc')
          .startAfter(startAt)
          .limit(6);
      } else {
        return ref
          .where('authorId', '==', this.authService.user.uid)
          .orderBy('updatedAt', 'desc')
          .limit(6);
      }
    });
    return this.getArticles(sorted);
  }

  getUserArticles(
    userId: string,
    startAt: firestore.QueryDocumentSnapshot<firestore.DocumentData>
  ): Observable<{
    latestDoc: firestore.QueryDocumentSnapshot<firestore.DocumentData>;
    ArticlesData: ArticleWithUser[];
  }> {
    const sorted = this.db.collection<ArticleWithUser>(`articles`, ref => {
      if (startAt) {
        return ref
          .where('authorId', '==', userId)
          .orderBy('updatedAt', 'desc')
          .startAfter(startAt)
          .limit(6);
      } else {
        return ref
          .where('authorId', '==', userId)
          .orderBy('updatedAt', 'desc')
          .limit(6);
      }
    });
    return this.getArticles(sorted);
  }

  getUserData(userId: string) {
    return this.db.doc<UserData>(`users/${userId}`).valueChanges();
  }

  getDiscreteArticle(articleId: string): Observable<ArticleWithUser> {
    let result: ArticleWithUser;
    let articleData: Article;
    let userData: UserData;
    return this.db
      .doc<Article>(`articles/${articleId}`)
      .valueChanges()
      .pipe(
        take(1),
        tap(doc => {
          articleData = doc;
        }),
        switchMap(() => {
          return this.db
            .doc<UserData>(`users/${articleData.authorId}`)
            .valueChanges()
            .pipe(
              tap(user => {
                userData = user;
              })
            );
        }),
        map(() => {
          result = {
            ...articleData,
            author: userData
          };
          if (result.thumbnailURL == null) {
            result.thumbnailURL = '/assets/images/thumbnail.png';
          }
          return result;
        })
      );
  }
}

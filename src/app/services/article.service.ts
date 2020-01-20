import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Article } from '../interfaces/article';
import { Observable, combineLatest, of } from 'rxjs';
import { ArticleWithUser } from '../interfaces/article-with-user';
import { switchMap, map, tap } from 'rxjs/operators';
import { UserData } from '../interfaces/user';
import { AuthService } from './auth.service';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private db: AngularFirestore, private authService: AuthService) {}

  createArticle(article: Omit<Article, 'articleId' | 'createdAt'>) {
    const articleId = this.db.createId();
    return this.db.doc(`articles/${articleId}`).set({
      articleId,
      ...article,
      createdAt: firestore.Timestamp.now()
    });
  }

  getArticles(sorted): Observable<ArticleWithUser[]> {
    let articles: Article[];
    return sorted.get({ source: 'server' }).pipe(
      map((actions: any[]) => {
        const data = [];
        actions.forEach(a => {
          const item = a.data() as Article;
          data.push(item);
        });
        return data;
      }),
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

  getPopularArticles(): Observable<ArticleWithUser[]> {
    const sorted = this.db.collection<ArticleWithUser>(`articles`, ref => {
      return ref.orderBy('favorite', 'desc').limit(6);
    });
    return this.getArticles(sorted);
  }

  getMyArticles(): Observable<ArticleWithUser[]> {
    const sorted = this.db.collection<ArticleWithUser>(`articles`, ref => {
      return ref
        .where('authorId', '==', this.authService.user.uid)
        .orderBy('createdAt', 'desc')
        .limit(6);
    });
    return this.getArticles(sorted);
  }

  getDiscreteArticle(articleId: string): Observable<ArticleWithUser> {
    let result: ArticleWithUser;
    let articleData: Article;
    let userData: UserData;
    return this.db
      .doc<Article>(`articles/${articleId}`)
      .valueChanges()
      .pipe(
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
          return result;
        })
      );
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { UserData } from 'functions/src/interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  afUser$: Observable<User> = this.afAuth.user;
  user;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar,
    private db: AngularFirestore,
    private fns: AngularFireFunctions
  ) {
    this.afUser$.subscribe(user => {
      this.user = user && user;
    });
  }

  async createUser(userId: string) {
    this.db
      .doc(`users/${userId}`)
      .get()
      .subscribe(async doc => {
        if (!doc.exists) {
          return this.afAuth.auth.getRedirectResult().then(async result => {
            const uid = result.user.providerData[0].uid;
            const { accessToken, secret } = result.credential as any;
            return this.db
              .doc(`users/${userId}/private/twitter`)
              .set({
                uid,
                accessToken,
                secret
              })
              .then(() => {
                return true;
              });
          });
        }
      });
  }

  deleteUser() {
    return this.afAuth.auth.currentUser.delete();
  }

  updateAvatar(userId: string) {
    const updateFn = this.fns.httpsCallable('updateTwitterAvatar');
    return updateFn({
      uid: userId
    });
  }

  login() {
    return this.afAuth.auth.signInWithRedirect(new auth.TwitterAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.snackBar.open('ログアウトしました！ 🕊', null, {
        duration: 2000
      });
    });
    this.router.navigateByUrl('/');
  }

  getUserData(userId: string) {
    return this.db.doc<UserData>(`users/${userId}`).valueChanges();
  }

  changeUserName(userId: string, name: string) {
    return this.db.doc<UserData>(`users/${userId}`).update({ userName: name });
  }
}

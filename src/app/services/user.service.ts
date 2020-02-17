import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { UserData } from '@interfaces/user';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private fns: AngularFireFunctions,
    private storage: AngularFireStorage
  ) {}

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

  getUserData(userId: string) {
    return this.db.doc<UserData>(`users/${userId}`).valueChanges();
  }

  changeUserName(userId: string, name: string) {
    return this.db.doc<UserData>(`users/${userId}`).update({ userName: name });
  }

  async changeUserAvatar(userId: string, message: string) {
    const result = await this.storage
      .ref(`users/${userId}`)
      .putString(message, 'data_url');
    const avatarURL = await result.ref.getDownloadURL();

    this.db.doc(`users/${userId}`).update({
      avatarURL
    });
  }
}

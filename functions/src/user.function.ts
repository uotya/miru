import * as functions from 'firebase-functions';
import * as Twitter from 'twitter';
import { UserData } from './interfaces/user';

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

export const updateTwitterAvatar = functions
  .region('asia-northeast1')
  .https.onCall(async (data, context) => {
    const twitterData = (
      await db.doc(`users/${data.uid}/private/twitter`).get()
    ).data();

    if (twitterData) {
      const twitterClient = new Twitter({
        consumer_key: functions.config().twitter.consumer_key,
        consumer_secret: functions.config().twitter.consumer_secret,
        access_token_key: twitterData.accessToken,
        access_token_secret: twitterData.secret
      });
      const twitterProfile = await twitterClient.get('users/show', {
        user_id: twitterData.uid
      });
      const result = twitterProfile.profile_image_url_https.replace(
        '_normal',
        ''
      );
      db.doc(`users/${data.uid}`).update({
        avatarURL: result
      });
    } else {
      throw new Error('認証に失敗しました');
    }
  });

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(user => {
    if (user.displayName && user.photoURL) {
      const sendUserData: UserData = {
        uid: user.uid,
        userName: user.displayName,
        avatarURL: user.photoURL?.replace('_normal', '')
      };
      db.doc(`users/${user.uid}`).set(sendUserData);
    } else {
      db.doc(`users/${user.uid}`).set({ uid: user.uid });
    }
  });

export const deleteUserData = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(user => {
    db.doc(`users/${user.uid}`).delete();
  });

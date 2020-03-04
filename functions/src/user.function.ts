import * as functions from 'firebase-functions';
import * as Twitter from 'twitter';
import { UserData } from './interfaces/user';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const stripe = require('stripe')(functions.config().stripe.key);

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
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB'
  })
  .auth.user()
  .onDelete(async user => {
    const firebase_tools = require('firebase-tools');
    await firebase_tools.firestore.delete(`users/${user.uid}`, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
      token: functions.config().fb.token
    });
  });

export const deleteUserArticles = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async user => {
    const articles = await db
      .collection('articles')
      .where('authorId', '==', user.uid)
      .get();
    const batch = db.batch();

    articles.forEach((doc: DocumentSnapshot) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  });

export const deleteCustomer = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async user => {
    const customer = (await db.doc(`customers/${user.uid}`).get()).data();
    stripe.customers.del(customer.customerId);
    return db.doc(`customers/${user.uid}`).delete();
  });

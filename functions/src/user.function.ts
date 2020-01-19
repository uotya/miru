import * as functions from 'firebase-functions';

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

export const createUser = functions.auth.user().onCreate(user => {
  db.doc(`users/${user.uid}`).set({
    uid: user.uid,
    userName: user.displayName,
    avatarURL: user.photoURL?.replace('_normal', '')
  });
});

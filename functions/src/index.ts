import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.createUser = functions.auth.user().onCreate(user => {
  const sendData = {
    userName: user.displayName,
    avatarURL: user.photoURL
  };
  db.doc(`users/${user.uid}`).set(sendData);
});

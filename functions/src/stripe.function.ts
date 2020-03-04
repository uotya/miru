import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const stripe = require('stripe')(functions.config().stripe.key);
const db = admin.firestore();

export const createCustomer = functions
  .region('asia-northeast1')
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        '権限がありません'
      );
    }

    const customer = await stripe.customers.create(data);

    console.log(context.auth.uid);
    return db.doc(`customers/${context.auth.uid}`).set({
      userId: context.auth.uid,
      customerId: customer.id
    });
  });

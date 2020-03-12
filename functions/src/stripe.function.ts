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
    return db.doc(`customers/${context.auth.uid}`).set({
      userId: context.auth.uid,
      customerId: customer.id
    });
  });

export const updateCustomer = functions
  .region('asia-northeast1')
  .https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        '権限がありません'
      );
    }
    stripe.customers.update(data.customerId, data.params);
  });

export const donateMoney = functions
  .region('asia-northeast1')
  .https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        '権限がありません'
      );
    }
    stripe.charges.create({
      amount: data.amount,
      currency: 'jpy',
      customer: data.customerId
    });
  });

export const paymentSucceeded = functions
  .region('asia-northeast1')
  .https.onRequest(async (request: any, response: any) => {
    const event = request.body;
    if (event.type === 'charge.succeeded') {
      const paymentIntent = event.data.object;
      await db
        .doc(`payment/${paymentIntent.customer}/history/${paymentIntent.id}`)
        .set({
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          paymentDate: admin.firestore.FieldValue.serverTimestamp()
        });
      return response.status(200).send('success');
    } else {
      return response.status(400).end();
    }
  });

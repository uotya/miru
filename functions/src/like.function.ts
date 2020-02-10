import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { shouldEventRun, markEventTried } from './utility.function';

const db = admin.firestore();

export const countUpFavorite = functions
  .region('asia-northeast1')
  .firestore.document('users/{userId}/likeArticles/{articleId}')
  .onCreate(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should: boolean) => {
      if (should) {
        await db
          .doc(`articles/${context.params.articleId}`)
          .update('favorite', admin.firestore.FieldValue.increment(1));
        return markEventTried(eventId);
      } else {
        return;
      }
    });
  });

export const countDownFavorite = functions
  .region('asia-northeast1')
  .firestore.document('users/{userId}/likeArticles/{articleId}')
  .onDelete(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should: boolean) => {
      if (should) {
        await db
          .doc(`articles/${context.params.articleId}`)
          .update('favorite', admin.firestore.FieldValue.increment(-1));
        return markEventTried(eventId);
      } else {
        return;
      }
    });
  });

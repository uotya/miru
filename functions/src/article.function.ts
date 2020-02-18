import * as functions from 'firebase-functions';
import { addIndex, updateIndex, removeIndex } from './algolia.function';

export const createArticle = functions
  .region('asia-northeast1')
  .firestore.document('articles/{id}')
  .onCreate(async (snap, context) => {
    return addIndex(snap.data());
  });

export const updateArticle = functions
  .region('asia-northeast1')
  .firestore.document('articles/{id}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data();
    if (!newData) {
      throw new Error('データが存在しません');
    }
    return updateIndex(newData);
  });

export const deleteArticle = functions
  .region('asia-northeast1')
  .firestore.document('articles/{id}')
  .onDelete(async (snapshot, context) => {
    return removeIndex(context.params.id);
  });

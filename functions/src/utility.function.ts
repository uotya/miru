import * as admin from 'firebase-admin';

const db = admin.firestore();

export function markEventTried(eventId: string) {
  const documentRef = db.collection('functionEvents').doc(eventId);
  return documentRef.set({ tried: true });
}

const leaseTime = 60 * 1000;

export function shouldEventRun(eventId: string) {
  const documentRef = db.collection('functionEvents').doc(eventId);
  return db.runTransaction(transaction => {
    return transaction.get(documentRef).then(doc => {
      const docData = doc.data();
      if (doc.exists && docData && docData.tried) {
        return false;
      }
      if (doc.exists && docData && new Date() < docData.lease) {
        return Promise.reject('Lease already taken, try later.');
      }
      transaction.set(documentRef, {
        lease: new Date(new Date().getTime() + leaseTime)
      });
      return true;
    });
  });
}

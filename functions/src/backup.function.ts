const functions = require('firebase-functions');
const firestore = require('@google-cloud/firestore');
const client = new firestore.v1.FirestoreAdminClient();

const bucket = 'gs://miru-backup';

export const scheduledFirestoreExport = functions
  .region('asia-northeast1')
  .pubsub.schedule('1 of month 04:00')
  .timeZone('Asia/Tokyo')
  .onRun((context: any) => {
    if (functions.config().env.mode === 'dev') {
      return true;
    }

    const databaseName = client.databasePath(
      process.env.GCP_PROJECT,
      '(default)'
    );
    return client
      .exportDocuments({
        name: databaseName,
        outputUriPrefix: bucket,
        collectionIds: ['articles', 'users', 'customers', 'payment']
      })
      .then((responses: any) => {
        const response = responses[0];
        console.log(`Operation Name: ${response['name']}`);
        console.log(response);
        return true;
      })
      .catch((err: any) => {
        console.error(err);
        throw new Error('Export operation failed');
      });
  });

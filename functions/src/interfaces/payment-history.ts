import { firestore } from 'firebase';

export interface PaymentHistory {
  id: string;
  amount: number;
  paymentDate: firestore.Timestamp;
}

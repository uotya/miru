import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(
    private db: AngularFirestore,
    private fns: AngularFireFunctions
  ) {}

  setCard(userId: string, card: any): Promise<void> {
    const { address_zip, exp_month, exp_year, last4, brand, id } = card;
    return this.db.doc(`users/${userId}/private/payment`).set(
      {
        card: { address_zip, exp_month, exp_year, last4, brand, id }
      },
      { merge: true }
    );
  }

  createCustomer(params: {
    source: string;
    name: string;
    email: string;
  }): Promise<void> {
    const callable = this.fns.httpsCallable('createCustomer');
    return callable(params).toPromise();
  }
}

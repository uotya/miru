import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Card } from '@interfaces/card';
import { PaymentHistory } from '@interfaces/payment-history';

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

  getCard(userId: string) {
    return this.db.doc<Card>(`users/${userId}/private/payment`).valueChanges();
  }

  createCustomer(params: {
    source: string;
    name: string;
    email: string;
  }): Promise<void> {
    const callable = this.fns.httpsCallable('createCustomer');
    return callable(params).toPromise();
  }

  updateCustomer(
    customerId: string,
    params: {
      source: string;
      name: string;
      email: string;
    }
  ): Promise<void> {
    const callable = this.fns.httpsCallable('updateCustomer');
    return callable({ customerId, params }).toPromise();
  }

  getCustomer(userId: string) {
    return this.db
      .doc<{ customerId: string; userId: string }>(`customers/${userId}`)
      .valueChanges();
  }

  donateMoney(customerId: string, amount: number): Promise<void> {
    const callable = this.fns.httpsCallable('donateMoney');
    return callable({ customerId, amount }).toPromise();
  }

  getPaymentHistories(customerId: string) {
    return this.db
      .collection<PaymentHistory>(`payment/${customerId}/history`)
      .valueChanges();
  }
}

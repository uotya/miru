import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Card } from '../interfaces/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(private db: AngularFirestore, private snackBar: MatSnackBar) {}

  createCard(card: Card) {
    const id = this.db.createId();
    return this.db
      .doc(`cards/${id}`)
      .set(card)
      .then(() => {
        this.snackBar.open('公開されました🥳', null, {
          duration: 2000
        });
      });
  }
}

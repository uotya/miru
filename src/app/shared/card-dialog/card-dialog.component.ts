import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Inject
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  StripeService,
  Elements,
  Element as StripeElement,
  ElementsOptions
} from 'ngx-stripe';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.scss']
})
export class CardDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  isEdit: boolean;
  creating = false;

  stripeForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });
  elements: Elements;
  card: StripeElement;
  elementsOptions: ElementsOptions = {
    locale: 'ja'
  };

  subscription = new Subscription();
  invalidCard = true;

  get invalid() {
    return this.invalidCard || this.stripeForm.invalid;
  }

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private authService: AuthService,
    private paymentService: PaymentService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data.customerId;
  }

  ngAfterViewInit(): void {
    const sub = this.stripeService
      .elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#90caf9',
                color: '#31325F',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#card-element');
          this.card.on('change', event => {
            this.invalidCard = !event.complete;
          });
        }
      });
    this.subscription.add(sub);
  }

  submit() {
    this.creating = true;
    if (this.data.customerId) {
      this.updateCustomer(this.authService.user.uid, this.data.customerId);
    } else {
      this.createCustomer(this.authService.user.uid);
    }
  }

  updateCustomer(userId: string, customerId: string) {
    const { name, email } = this.stripeForm.value;
    const sub = this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          this.paymentService.setCard(userId, result.token.card);
          this.paymentService
            .updateCustomer(customerId, {
              source: result.token.id,
              name,
              email
            })
            .then(() => {
              this.saved();
            })
            .catch(error => {
              console.log(error);
              this.saved();
            });
        } else if (result.error) {
          this.snackBar.open('カード情報が不正です', null, {
            duration: 2000
          });
          this.creating = false;
        }
      });
    this.subscription.add(sub);
  }

  createCustomer(userId: string) {
    const name = this.stripeForm.get('name').value;
    const email = this.stripeForm.get('email').value;
    const sub = this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          this.paymentService.setCard(userId, result.token.card);
          this.paymentService
            .createCustomer({ source: result.token.id, name, email })
            .then(() => {
              this.saved();
            })
            .catch(error => {
              console.log(error);
              this.saved();
            });
        } else if (result.error) {
          this.snackBar.open('カード情報が不正です', null, {
            duration: 2000
          });
          this.creating = false;
        }
      });
    this.subscription.add(sub);
  }

  saved() {
    this.dialogRef.close(true);
    this.snackBar.open(
      `カードを${this.isEdit ? '変更' : '登録'}しました`,
      null,
      { duration: 2000 }
    );
    this.creating = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

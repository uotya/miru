import { tap, take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatDialog } from '@angular/material/dialog';
import { CardDialogComponent } from '../shared/card-dialog/card-dialog.component';
import { PaymentService } from '../services/payment.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class DonateComponent implements OnInit {
  customerId: string;
  isLoading = true;
  donating = false;
  donated = false;

  card$: Observable<any>;

  donateForm = this.fb.group({
    amount: [
      '',
      [
        Validators.required,
        Validators.pattern(/^([1-9]\d*|0)$/),
        Validators.min(50),
        Validators.max(1000000)
      ]
    ]
  });

  get includeTax() {
    return Math.floor(this.donateForm.value.amount * 1.1);
  }

  get amountControl() {
    return this.donateForm.get('amount') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private paymentService: PaymentService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    this.authService.afUser$.subscribe(user => {
      this.isLoading = false;
      this.loadingService.toggleLoading(false);
      this.card$ = this.paymentService.getCard(user.uid).pipe(
        tap(() => {
          this.paymentService
            .getCustomer(user.uid)
            .pipe(take(1))
            .subscribe(result => {
              this.customerId = result?.customerId;
            });
        })
      );
    });
  }

  registerCard() {
    this.dialog.open(CardDialogComponent, {
      data: { customerId: this.customerId },
      restoreFocus: false
    });
  }

  submit() {
    this.donating = true;
    this.paymentService
      .donateMoney(this.customerId, this.includeTax)
      .then(() => {
        this.donating = false;
        this.donated = true;
        this.snackBar.open('寄付が完了しました', null, {
          duration: 2000
        });
      })
      .catch(error => {
        console.log(error);
        this.donating = false;
      });
  }
}

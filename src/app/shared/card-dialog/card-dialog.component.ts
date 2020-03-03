import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject
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
@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.scss']
})
export class CardDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  isEdit: boolean;

  stripeForm = this.fb.group({
    name: ['', [Validators.required]],
    mail: ['', [Validators.required]]
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
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

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
    this.createCustomer(this.authService.user.uid);
  }

  createCustomer(userId: string) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

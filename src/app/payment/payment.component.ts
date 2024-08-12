import { Component, Input, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, Validators } from '@angular/forms';
import { injectStripe, StripeCardComponent } from 'ngx-stripe';
import { enviroment } from '../../enviroments/enviroment';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { PaymentIntentDto } from '../model/payment-intent-dto';
import { PaymentService } from './payment.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  @ViewChild(StripeCardComponent) cardElement!: StripeCardComponent;

  @Input() price: any;
  @Input() description: any;
  @Input() name: any;

  error: any;

  readonly dialog = inject(MatDialog);

  constructor(private fb: FormBuilder, private paymentService: PaymentService) { }

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  checkOutForm = this.fb.group({
    name: ['', Validators.required]
  })

  stripe = injectStripe(enviroment.publicAPIKey);

  payment: any = {};

  errorMessage: string = '';

  pay() {
    this.errorMessage = '';
    const userName = this.checkOutForm.get('name')?.value;
    this.stripe
      .createToken(this.cardElement.element)
      .subscribe((result) => {
        if(result.token) {
          const paymentIntentDto: PaymentIntentDto = {
            token: result.token.id,
            description: this.description,
            amount: this.price*100,
            currency: 'EUR'
          }
          this.paymentService.pay(paymentIntentDto).subscribe(
            data => {
              this.payment = data;
              this.dialog.open(ModalComponent, {
                data: {id:this.payment.id, price: this.price, description: this.description, name: this.name, userName: userName }
              })
            }
          );
        } else if(result.error) {
            this.errorMessage = result.error.message!;
        }
      })
  }

}

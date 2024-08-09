import { Component, Input, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, Validators } from '@angular/forms';
import { injectStripe } from 'ngx-stripe';
import { enviroment } from '../../enviroments/enviroment';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  @Input() id: any;
  @Input() price: any;
  @Input() description: any;
  @Input() name: any;

  error: any;

  readonly dialog = inject(MatDialog);

  constructor(private fb: FormBuilder) { }

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

  openModalPayment(): void {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: {id: this.id, price: this.price, description: this.description, name: this.name}
      });
      console.log(this.id);
  }

}

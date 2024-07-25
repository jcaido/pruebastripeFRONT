import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { enviroment } from '../../enviroments/enviroment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  stripe: any;
  card: any;

  constructor() { }

  async ngOnInit() {
    this.stripe = await loadStripe(enviroment.publicAPIKey);

    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
  }

  handlePayment() {

  }

}

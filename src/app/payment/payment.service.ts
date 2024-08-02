import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const STRIPE_API = 'http://localhost:8080/api/stripe/';

const httOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }
}

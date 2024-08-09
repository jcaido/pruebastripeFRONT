import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const STRIPE_API = 'http://localhost:8080/api/stripe/';

const httOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) {}

  public confirm(id: string): Observable<string> {
    return this.httpClient.post<string>(STRIPE_API + `confirm/${id}`, {}, httOptions);
  }

  public cancel(id: string):Observable<string> {
    return this.httpClient.post<string>(STRIPE_API + `cancel/${id}`, {}, httOptions);
  }
}

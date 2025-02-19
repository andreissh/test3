import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class CurrencyService {
  private http = inject(HttpClient);
  private URL = `https://v6.exchangerate-api.com/v6/${environment.apiKey}/latest/`;

  getExchangeRates(currency: string): Observable<any> {
    return this.http.get(`${this.URL}${currency}`);
  }
}

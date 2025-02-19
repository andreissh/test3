import { Component, inject } from '@angular/core';
import { CurrencyInputComponent } from './currency-input/currency-input.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, CurrencyInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currencies: string[] = [];
  selectedCurrencyFrom$ = new BehaviorSubject<string>('USD');
  selectedCurrencyTo = 'RUB';
  conversionRates: Record<string, number> = {};
  openDropdown: 'from' | 'to' | null = null;
  amountFrom = 0;

  private http = inject(HttpClient);

  constructor() {
    this.selectedCurrencyFrom$
      .pipe(
        switchMap((currency) =>
          this.http.get(
            `https://v6.exchangerate-api.com/v6/${environment.apiKey}/latest/${currency}`
          )
        )
      )
      .subscribe((data: any) => {
        this.currencies = Object.keys(data.conversion_rates);
        this.conversionRates = data.conversion_rates;
      });
  }

  onToggleDropdown(type: 'from' | 'to') {
    this.openDropdown = this.openDropdown === type ? null : type;
  }

  selectCurrency(type: 'from' | 'to', currency: string) {
    if (type === 'from') {
      this.selectedCurrencyFrom$.next(currency);
    } else {
      this.selectedCurrencyTo = currency;
    }
    this.openDropdown = null;
  }

  swapCurrencies() {
    const currentFrom = this.selectedCurrencyFrom$.getValue();
    this.selectedCurrencyFrom$.next(this.selectedCurrencyTo);
    this.selectedCurrencyTo = currentFrom;
  }

  get amountTo(): number {
    const rate = this.conversionRates[this.selectedCurrencyTo] || 1;
    return this.amountFrom * rate;
  }

  updateAmountFrom(value: number) {
    this.amountFrom = value;
  }
}

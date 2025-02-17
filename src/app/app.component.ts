import { Component } from '@angular/core';
import { CurrencyInputComponent } from './currency-input/currency-input.component';

@Component({
  selector: 'app-root',
  imports: [CurrencyInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currencies = ['USD', 'EUR', 'RUB', 'GBP', 'CNY'];
  selectedCurrencyFrom = 'USD';
  selectedCurrencyTo = 'RUB';
  openDropdown: 'from' | 'to' | null = null;

  onToggleDropdown(type: 'from' | 'to') {
    this.openDropdown = this.openDropdown === type ? null : type;
  }

  selectCurrency(type: 'from' | 'to', currency: string) {
    if (type === 'from') {
      this.selectedCurrencyFrom = currency;
    } else {
      this.selectedCurrencyTo = currency;
    }
    this.openDropdown = null;
  }

  swapCurrencies() {
    [this.selectedCurrencyFrom, this.selectedCurrencyTo] = [
      this.selectedCurrencyTo,
      this.selectedCurrencyFrom,
    ];
  }
}

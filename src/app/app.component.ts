import { Component, HostListener } from '@angular/core';
import { CurrencyInputComponent } from './components/currency-input/currency-input.component';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, CurrencyInputComponent],
  providers: [CurrencyService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currencies: string[] = [];
  selectedCurrencyFrom$ = new BehaviorSubject<string>('USD');
  selectedCurrencyTo = 'RUB';
  conversionRates: Record<string, number> = {};
  openDropdown: 'from' | 'to' | null = null;
  isLoading: boolean = false;
  amountFrom = 0;
  currentAmountTo: number = 1;

  constructor(currencyService: CurrencyService) {
    this.selectedCurrencyFrom$
      .pipe(
        tap(() => (this.isLoading = true)),
        switchMap((currency) => currencyService.getExchangeRates(currency))
      )
      .subscribe((data: any) => {
        this.currencies = Object.keys(data.conversion_rates);
        this.conversionRates = data.conversion_rates;
        this.isLoading = false;
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
    this.openDropdown = type;
  }

  swapCurrencies() {
    const currentFrom = this.selectedCurrencyFrom$.getValue();
    this.selectedCurrencyFrom$.next(this.selectedCurrencyTo);
    this.selectedCurrencyTo = currentFrom;
  }

  get amountTo(): number {
    const rate = this.conversionRates[this.selectedCurrencyTo] || 1;
    if (!this.isLoading) {
      this.currentAmountTo = this.amountFrom * rate;
      return this.amountFrom * rate;
    }

    return this.currentAmountTo;
  }

  updateAmountFrom(value: number) {
    this.amountFrom = value;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.currency-dropdown')) {
      this.openDropdown = null;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.openDropdown = null;
  }
}

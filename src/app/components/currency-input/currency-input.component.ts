import { MatIconModule } from '@angular/material/icon';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-currency-input',
  imports: [MatIconModule],
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.scss',
})
export class CurrencyInputComponent {
  @Input() currencies: string[] = [];
  @Input() selectedCurrency!: string;
  @Input() isOpen!: boolean;
  @Input() amount: number = 0;
  @Input() readonly: boolean = false;

  @Output() toggleDropdown = new EventEmitter<'from' | 'to'>();
  @Output() selectCurrency = new EventEmitter<string>();
  @Output() amountChange = new EventEmitter<number>();

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.valueAsNumber;

    if (value < 0) {
      value = 0;
      inputElement.value = '0';
    }

    this.amountChange.emit(value);
  }
}

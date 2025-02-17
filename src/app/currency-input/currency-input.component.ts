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

  @Output() toggleDropdown = new EventEmitter<'from' | 'to'>();
  @Output() selectCurrency = new EventEmitter<string>();
}

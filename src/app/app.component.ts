import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyInputComponent } from './currency-input/currency-input.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CurrencyInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'my-app';
}

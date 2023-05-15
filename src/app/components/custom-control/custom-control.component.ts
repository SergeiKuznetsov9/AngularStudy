import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-custom-control',
  templateUrl: './custom-control.component.html',
  styleUrls: ['./custom-control.component.scss']
})
// класс должен реализовывать интерфейс ControlValueAccessor
// Это значит, что в обязательном порядке нужно реализовать 4 метода
// (один из них не обязательный)
export class CustomControlComponent implements ControlValueAccessor {

  onChange

  // нужен для того, чтобы зарегистрировать callback, который будет
  // вызываться каждый раз, когда будет изменено значение через UI
  // УТОЧНЕНИЕ: метод registerOnChange вызовится 1 раз при инициализации,
  // а вот fn, который присвоен this.onChange, будет вызываться постоянно
  registerOnChange(fn: any): void {
    this.onChange = fn
  }

}

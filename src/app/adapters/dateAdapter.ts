import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
  /* 
    таким образом мы переписываем два нативных метода NativeDateAdapter
  */

  /* Метод будет принимать значение лююого типа, а отдавать значение типа Date или null */
  override parse(value: any): Date | null {
    /* 
    проверяем входящие значения
  */
    if (typeof value === 'string' && value.indexOf('/') > -1) {
      const str = value.split('/');
      const date = Number(str[0]);
      const month = Number(str[1]);
      const year = Number(str[2]);
      return new Date(year, month, date);
    }

    const timeStamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timeStamp) ? null : new Date(timeStamp);
  }

  override format(date: Date, displayFormat: string): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return (
        this._to2digit(day) +
        '.' +
        this._to2digit(month) +
        '.' +
        this._to2digit(year)
      );
    } else if(displayFormat === 'inputMonth')  {
      const month = date.getMonth() +1;
      const year = date.getFullYear();
      return this._to2digit(month) + '.' + year
    } else {
      return date.toDateString()
    }
  }

  private _to2digit(n: number): string {
    return ('00' + n).slice(-2);
  }
}

export const APP_DATE_FORMATS = {
  parse: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'}    
  },
  display: {
    dateInput: 'input',
    monthYearLabel: 'inputMonth',
    dateAllyLabel: {month: 'long', year: 'numeric', day: 'numeric'},
    monthYearAllyLabel: {month: 'long', year: 'numeric'}
  }
}

/* 
  Чтобы этот адаптер заработал нужно в AppModule его запровайдить. Вот так:

    providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
  ],

  импорты такие:
  import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './adapters/dateAdapter';


*/

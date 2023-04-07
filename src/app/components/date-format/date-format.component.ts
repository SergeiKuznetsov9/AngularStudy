import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-date-format',
  templateUrl: './date-format.component.html',
  styleUrls: ['./date-format.component.scss'],
})
export class DateFormatComponent {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this._createForm();
  }

  private _createForm() {
    this.myForm = this.fb.group({
      releasedAt: '',
    });
  }

  showFormData() {
    console.log(this.myForm.value);
  }





  date = moment();

  selDate: string = '';
  selDay: string = '';
  selMonth: string = '';
  selYear: string = '';

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = moment(event.value);
    this.selDate = this.date.format('DD');
    this.selDay = this.date.format('dddd');
    this.selMonth = this.date.format('MMMM');
    this.selYear = this.date.format('YYYY');
    console.log(this.selDate)
    console.log(this.selDay)
    console.log(this.selMonth)
    console.log(this.selYear)
  }








  /*
    Все что нужно сделать здесь - это заимпортировать moment  Dc
  */
}

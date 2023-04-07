import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-russian-date',
  templateUrl: './russian-date.component.html',
  styleUrls: ['./russian-date.component.scss']
})
export class RussianDateComponent {

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

}















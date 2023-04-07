import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-picker',
  templateUrl: './basic-picker.component.html',
  styleUrls: ['./basic-picker.component.scss'],
})
export class BasicPickerComponent {
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

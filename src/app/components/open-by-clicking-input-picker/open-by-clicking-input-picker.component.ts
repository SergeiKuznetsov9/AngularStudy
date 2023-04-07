import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-open-by-clicking-input-picker',
  templateUrl: './open-by-clicking-input-picker.component.html',
  styleUrls: ['./open-by-clicking-input-picker.component.scss']
})
export class OpenByClickingInputPickerComponent {

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



import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  myForm!: FormGroup;


  constructor(private fb: FormBuilder) {
    this._createForm()
  }

  private _createForm() {
    this.myForm = this.fb.group({
      passenger: '',
      passengerAge: ''
    })
  }

  showInf() {
    console.log(this.myForm.value)
  }

}

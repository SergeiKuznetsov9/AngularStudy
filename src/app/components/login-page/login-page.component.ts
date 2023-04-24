import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  myForm: FormGroup = new FormGroup({
    name: new FormControl(),
    password: new FormControl(),
  });

  constructor() {}

  submit() {
    console.log(this.myForm.value);
  }
}

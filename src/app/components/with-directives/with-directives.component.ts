import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-with-directives',
  templateUrl: './with-directives.component.html',
  styleUrls: ['./with-directives.component.scss']
})
export class WithDirectivesComponent {

  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this._createForm();
  }

  private _createForm() {
    this.myForm = this.fb.group({
      releasedAt: '',
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public simpleTextControl: FormControl = new FormControl();
  
  ngOnInit(): void {
    this.simpleTextControl.valueChanges.subscribe(console.log)
  }

}

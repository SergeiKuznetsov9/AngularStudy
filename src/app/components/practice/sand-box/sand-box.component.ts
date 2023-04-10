import { AfterViewInit, Component,ViewChild } from '@angular/core';
import { Observable, combineLatest, fromEvent, map, startWith, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-sand-box',
  templateUrl: './sand-box.component.html',
  styleUrls: ['./sand-box.component.scss']
})
export class SandBoxComponent implements AfterViewInit {

  constructor() {}

  ngAfterViewInit() {}

}

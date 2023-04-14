import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {



  constructor() {}

  ngOnInit() {

    // с subject все просто
/*     const sequence$$ = new Subject()
    sequence$$.subscribe(console.log)
    sequence$$.next('Hi') */



// У него есть подвид
// const sequence$$ = new BehaviorSubject('initial Value')
// можно получить последнее значение

// есть и третий подвид
/* 1.30 */



























  }

}

import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';

@Component({
  selector: 'app-where-client-swiped',
  templateUrl: './where-client-swiped.component.html',
  styleUrls: ['./where-client-swiped.component.scss']
})
export class WhereClientSwipedComponent implements OnInit {
  // задача
  // нужно написать логику, определяющую куда свайпнул юзер

  constructor() {}

  ngOnInit() {
    fromEvent<TouchEvent>(document, 'touchstart')
      .pipe(
        tap( v => console.log(v)),
        map( e => {
          return e.changedTouches[0].clientX
        })
      )
      .subscribe( v => console.log(v))

    fromEvent<TouchEvent>(document, 'touchend')
  }

}

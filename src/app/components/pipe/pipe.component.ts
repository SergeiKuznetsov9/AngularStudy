import { Component, OnInit } from '@angular/core';
import { filter, interval, map, skip, take, tap } from 'rxjs';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.scss'],
})
export class PipeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {

    // Для обработки значений, эмитируемых observable используется pipe

    // оператор tap - вне зависимости от того, какие внутри действия он производит, в
    // следующий обработчик будет передано изначально полученное значение

    // оператор map - преобразует полученное значение
    
    // оператор filter - позволяет пропускать значения, удовлетворящие условию

    //  skip(2) - пропустит первых 2 значения

    // take(1) - возьмет только первое значение из потока и завершит его

/* 
    const sequence$ = interval(1000)
    sequence$.pipe(
      tap( v => {
        console.log(v) 
        return [1, 2, 3, 4]
      }),
      filter( v => v % 2 === 0),
      map( (v: number) => v*v),
      skip(2),
      take(1),
    ).subscribe( v => console.log(v))
 */















  }
}

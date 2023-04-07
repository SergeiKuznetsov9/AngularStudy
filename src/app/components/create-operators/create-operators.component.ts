import { Component, OnInit } from '@angular/core';
import { defer, from, iif, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-create-operators',
  templateUrl: './create-operators.component.html',
  styleUrls: ['./create-operators.component.scss'],
})
export class CreateOperatorsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // https://rxjs-dev.firebaseapp.com/guide/operators
    // https://rxmarbles.com/ - визуализация работы операторов




    // Операторы создания
    // Это холодный конечный поток
    /*
  const sequence$ = of(1, 4, 6, 5)
  sequence$.subscribe({
    next: (v) => console.log(v)
  })
*/
    // ***************************************************************************************************
    // Это холодный конечный поток
    /*
  const sequence$ = from([1, 4, 6, 5])
*/
    // ***************************************************************************************************
    // Также можно создать из промиса: (псевдокод)
    /*
  const sequence$ = from(
    fetch('endpoint')
      .then( res => res.json())
  )

  sequence$.subscribe( v => {
    console.log(v)
  })
*/
    // Это может понадобиться, чтобы перейти от промиса к observable
    // ***************************************************************************************************
    // Оператор iif()
    // принимает три аргумента: функцию, возвращающую boolean; операторы создания потоков. Если функция true,
    // отработает первый, если false - второй
    /*
const random = Math.round(Math.random() * 10);

const sequence$ = iif( () => {
  return random > 5
}, of( 'Value > 5'), of('Value < 5'))

sequence$.subscribe({
  next: (v) => console.log(v)
})
*/
    // ***************************************************************************************************
    // Оператор defer()
    // Похож на предыдущий, но позволяет использовать условное ветвление
    /*
const random = Math.round(Math.random() * 10);

const sequence$ = defer( () => {
  return random > 5
    ? random >= 8
      ? of( 'Value > 8')
      : of('Value > 5 < 8')
    : of( 'Value < 5')
}) 

sequence$.subscribe({
  next: (v) => console.log(v)
})
*/
    // ***************************************************************************************************
    // Оператор ajax() - позволяет сделать fetch запрос (импортируется не так как другие!!!):
    // однако интерцептора у такого запроса нету.
    /* const sequence$ = ajax(
  'endpoint'
)
// в v попадет ответ на запрос
sequence$.subscribe({
  next: v => console.log(v.response)
}) */
    // ***************************************************************************************************
  }
}

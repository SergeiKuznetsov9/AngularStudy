import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, interval, map, mergeAll, mergeMap, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-high-order-operators',
  templateUrl: './high-order-operators.component.html',
  styleUrls: ['./high-order-operators.component.scss']
})
export class HighOrderOperatorsComponent implements AfterViewInit {

  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>

  constructor() {

  }

  ngAfterViewInit() {

    // Рассмотрим такой код:
/* 
    interval(1000)
      .pipe(
        map( el => {
          return of(el*3)
        })
      )
      .subscribe( el => el.subscribe(console.log))
 */

// Он работать будет, но это очень плохая практика, на каждом шаге будет возвращаться observable
// Правильнее использовать HighOrderObservable

// Таким образом, оператор высшего порядка это когда потоком исходят другие потоки

// следущий код после подписки будет возвращать Observable. И, как указано выше, subscribe внутри subscribe
// делать не стоит

/* 
const sequence$ = fromEvent(this.inputEl.nativeElement, 'input')
.pipe(
  map( e => {
    const value = (e.target as HTMLInputElement).value
    return ajax(`https://api.github.com/search/repositories?q=${value}`)
  }),
)

sequence$.subscribe(console.log)
 */

// Для того, чтобы возвращался результат запроса, достаточно добавить оператор mergeAll()
// Можно проверить результат:

// mergeAll() cобирает все observable и автоматически на них подписывается, поэтому это и работает
/* 
const sequence$ = fromEvent(this.inputEl.nativeElement, 'input')
.pipe(
  map( e => {
    const value = (e.target as HTMLInputElement).value
    return ajax(`https://api.github.com/search/repositories?q=${value}`)
  }),
  mergeAll(),
  map( el => el.response)
)

sequence$.subscribe(console.log)
 */

// Но есть способ лучше, использовать mergeMap вместо map и mergeAll
/* 
const sequence$ = fromEvent(this.inputEl.nativeElement, 'input')
.pipe(
  mergeMap( e => {
    const value = (e.target as HTMLInputElement).value
    return ajax(`https://api.github.com/search/repositories?q=${value}`)
  }),
  map( el => el.response)
)

sequence$.subscribe(console.log)
 */



// Результатом такого кода будет паралельная обработка запросов на каждый введенный символ в инпуте.
// Колличество параллельных запросов (потоков) можно сократить при помомщи второго аргумента:
/* 4.39 */
const sequence$ = fromEvent(this.inputEl.nativeElement, 'input')
.pipe(
  mergeMap( e => {
    const value = (e.target as HTMLInputElement).value
    return ajax(`https://api.github.com/search/repositories?q=${value}`)
  }, 2),
  map( el => el.response)
)

sequence$.subscribe(console.log)






























  }

}

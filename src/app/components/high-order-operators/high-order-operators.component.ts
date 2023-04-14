import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, interval, map, mergeAll, mergeMap, of, switchAll, switchMap } from 'rxjs';
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
// http://rxjs.rsh.icu/operators/mergeMap
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
// Колличество параллельных запросов (потоков) можно сократить при помомщи второго аргумента - 
// количества обрабатываемых запросов:
/* const sequence$ = fromEvent(this.inputEl.nativeElement, 'input')
.pipe(
  mergeMap( e => {
    const value = (e.target as HTMLInputElement).value
    return ajax(`https://api.github.com/search/repositories?q=${value}`)
  }, 2),
  map( el => el.response)
)

sequence$.subscribe(console.log) */



// Еще один интересный оператор switchAll и switchMap (разница между ними аналогична уже рассмотренным)
// Они похожи на предыдущие, но разница в том, что при возникновении нового события, производится отписка
// от предыдущего (если он еще не завершен)

// Но для того, чтобы потоки не порождались на каждый чих, можно использовать debounceTime(300)

// Еще один интересный оператор concatAll и concatMap (разница между ними аналогична уже рассмотренным)
// Они похожи на предыдущие, но разница в том, что подписка на следующий поражденный поток будет
// производится лишь после того, как предыдущий поток заэмитит событие (но подписка будет произведена). Ниже визуализация
// http://rxjs.rsh.icu/operators/mergeMap
// при возникновении нового события, производится отписка
// от предыдущего (если он еще не завершен)


// Еще один интересный оператор exhaustAll и exhaustMap (разница между ними аналогична уже рассмотренным)
// Они похожи на предыдущие, но разница в том, что подписка на следующий поражденный поток будет
// производится лишь после того, как предыдущий поток заэмитит событие и только в том случае, если новый эмит
// возникнет после такого эмита. Прочие эмиты будут проигнорированы. Ниже визуализация
// http://rxjs.rsh.icu/operators/mergeMap





















  }

}

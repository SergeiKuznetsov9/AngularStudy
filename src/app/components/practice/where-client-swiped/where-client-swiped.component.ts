import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent, iif, merge, of, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-where-client-swiped',
  templateUrl: './where-client-swiped.component.html',
  styleUrls: ['./where-client-swiped.component.scss'],
})
export class WhereClientSwipedComponent implements OnInit {
  // задача
  // нужно написать логику, определяющую куда свайпнул юзер

  constructor() {}

  ngOnInit() {

    // pipe желательно отделять от продьюсера, т.к. потом, в целях тестирования нужно будет подменять пайп
    // поэтому если сразу отделить, то потом будет легче.
/* 
    // создадим нужную функцию:
    function getX(source$: Observable<TouchEvent>) {
      return source$.pipe(map((e) => e.changedTouches[0].clientX));
    }

    // Используя эту функцию получим координату X по нажатию и ее же при отпускании кнопки:
    const touchStart$ = getX(fromEvent<TouchEvent>(document, 'touchstart'));
    const touchEnd$ = getX(fromEvent<TouchEvent>(document, 'touchend'));
    // Таким образом у нас есть два источника, к которым можем подписаться.

    // Далее эти иcточники нужно объеденить:
    const swipering$ = zip(
      touchStart$,
      touchEnd$
    );

    // далее пишем функцию, чтобы с этим можно было работать. Внутри функции используем pipe. Такой
    // стратегией можем сколько угодно писать обрабатывающих функций, на результаты которых достаточно будет
    // только подписаться:
    function swipe(source$: Observable<[number, number]>) {
      return source$.pipe(map(([startX, endX]) => startX - endX));
    }

    // вызываем функцию и в subscribe пишем логику обработки результата
    swipe(swipering$).subscribe((e) => {
      e > 0 ? console.log('Swiped left') : console.log('Swiped right');
    });
 */


    // *************************************************************************************************************


    // Описанное будет работать только на тачпадах. Но можно сделать так, что оно будет работать на обычных
    // устройствах. Для этого следует использовать немного другой варинат с оператором merge:
    
    // Добавляем дополнительный аргумент к функции getX и мержим два потока
/*     function getX(source1$: Observable<TouchEvent>, source2$: Observable<MouseEvent>) {
      return merge(source1$, source2$).pipe(
        map( (event: MouseEvent | TouchEvent) => {
          if(event instanceof TouchEvent) {
            return event.changedTouches[0].clientX
          }
          return event.clientX
        }
        ));
    }

    const swipering$ = zip(
      getX(fromEvent<TouchEvent>(document, 'touchstart'), fromEvent<MouseEvent>(document, 'mousedown')),
      getX(fromEvent<TouchEvent>(document, 'touchend'), fromEvent<MouseEvent>(document, 'mouseup'))
    );

    function swipe(source$: Observable<[number, number]>) {
      return source$.pipe(map(([startX, endX]) => startX - endX));
    }

    swipe(swipering$).subscribe((e) => {
      e > 0 ? console.log('Swiped left') : console.log('Swiped right');
    }); */










  }
}

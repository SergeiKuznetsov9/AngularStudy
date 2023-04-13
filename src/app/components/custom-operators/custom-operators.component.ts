import { Component, OnInit } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, Subscriber, filter, interval, pipe } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-custom-operators',
  templateUrl: './custom-operators.component.html',
  styleUrls: ['./custom-operators.component.scss']
})
export class CustomOperatorsComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    /* ********************************************************ТРЕБУЕТ ДОПОЛНИТЕЛЬНОГО ИЗУЧЕНИЯ */

    // К примеру нужно сделать свой оператор
    //  Начнем с функции, которая ничего не делает:

    // function doNothing(source$: Observable<any>) {
    //   return source$
    // }

    // Проверить его можно так:

    // interval(1000).pipe(
    //   doNothing
    // )
    //   .subscribe(console.log)

    // В данном контексте нужно понимать (и это очень важно), что подписка осуществляется не на первый
    // оператор (interval), а на последний, т.е. doNothing.
    // Проверить это можно так:

    // Далее напишем функцию, которая принимает нейкий сорс, но возвращает новый observable:

    // function toText(source$: Observable<any>) {
    //   return new Observable( subscriber => {
    //     subscriber.next('RxJS is awesome!!!')
    //     subscriber.complete()
    //   })
    // }

    // Данную функцию прокинем в pipe и посмотрим на результат:
    // interval(1000).pipe(
    //   toText
    // )
    //   .subscribe(console.log)

    // В результате мы не увидим интервала, но увидим результат нового обсервэбла
    // Таким образом, подписка осуществилась именно на то, что вернул последний оператор

    // *************************************************************************************************************

    // Напишем оператор, который будет возвращать удвоенное значение:

/*     class DoubleSubscriber extends Subscriber<number> {
      override next(value: number) {
        super.next(value * 2)
      }
    }

    function doubleValue(source$: Observable<number>) {
      const o$ = new Observable();
      // устанавливаем источник вновь созданного Observable
      o$.source = source$;

      // устанавливаем ему оператор
      o$.operator = {
        call(subscriber: Subscriber<unknown>, source: any) {
          source.subscribe(new DoubleSubscriber(subscriber))
        }
      };

      return o$
    }


    interval(1000).pipe(
      doubleValue
    )
      .subscribe(console.log) */

// Однако это метод устаревший, многие API деприкэйтид
// ***********************************************************************************************

// Правильно это сделать при помощи оператора lift
// он есть у любого observable
// Этот оператор делает то, что написано выше: он создает новый поток с источником целевого обсервэбла ( т.е.
// того, к которому применен и применяет к нему переданный в него оператор)
// Пример выше с lift выглядит следующим образом:

// class DoubleSubscriber extends Subscriber<number> {
//       override next(value: number) {
//         super.next(value * 2)
//       }
//     }

//     function doubleValue(source$: Observable<number>) {
//       source$
//         .lift({
//           call(subscriber: Subscriber<unknown>, source: any) {
//             source.subscribe(new DoubleSubscriber(subscriber))
//           }
//         }
//         )


//       return source$
//     }


//     interval(1000).pipe(
//       doubleValue
//     )
//       .subscribe(console.log)

// **************************************************************************************************

// ЧЕЙНИНГ ОПЕРАТОРОВ
// Операторы можно чейнить и в последующем использовать за один сразу построенную цепочку:

// const filterWithdouble = pipe(
//   filter( (x: any) => x % 3 === 0),
//   double // нейкий кастомный оператор
// )

// // Применение 

// interval(1000).pipe(
//   filterWithdouble
// )
//   .subscribe(console.log)


// ******************************************************************************************************

// Написанный в ручную pipe
// const pipeMy = (...fns: Function[]) => (source: Observable<any>) => fns.reduce(
//   (newSource, fn) => fn(newSource), source
// )

// ******************************************************************************************************
// ******************************************************************************************************
// ******************************************************************************************************
// ******************************************************************************************************
// ******************************************************************************************************
// ******************************************************************************************************
// ******************************************************************************************************
// ******************************************************************************************************
// ******************************************************************************************************


// ДРУГОЙ ИСТОЧНИК ПРО КАСТОМНЫЕ ОПЕРАТОРЫ
// оператор - это всего лишь функция, которая принимает поток и возвращает поток, но измененный.
// Напишем ничего не делающий оператор:

const initSourse$ = interval(1000).pipe(take(10)) // создан начальный поток

function nothigDo<T>(source$: Observable<T>): Observable<T> { // оператор который ничего не делает
  return source$
}

function consoling<T>(source$: Observable<T>): Observable<T> { // оператор который консолит значения и передает ихв следующий поток
  return source$.pipe(
    tap(console.log)
  )
}
// initSourse$
//   .pipe(
//     nothigDo,
//     consoling
//   )
//   .subscribe()

// в некоторых случаях, для использования кастомного оператора необходимо указать контекст
// в этом случае необходимо использовать фабрику оператора. То есть определить функцию, которая
// будет возвращать оператор. Таким образом, аргументами фабрики можно передать аргументы, которые 
// будут входить в лексическую область видимости оператора
// Например сделаем фабрику, возвращающую кастомный оператор, который консолит значения потока:

/*
function consolingFactory<T>(log: string): (source$: Observable<T>) => Observable<T> {
  return (source$: Observable<T>) => (
    source$.pipe(
      tap( v => console.log(log, v))
    )
  )
}

initSourse$.pipe(
  consolingFactory('RxJS')
).subscribe()
*/

// Типизацию можно упростить, тогда она будет выглядеть так:
/* 
function consolingFactory<T>(log: string): MonoTypeOperatorFunction<T> {
  return pipe(
      tap( v => console.log(log, v))
    )  
}

initSourse$.pipe(
  consolingFactory('RxJS')
).subscribe()
 */

// *********************************************************************************************

// Функция фабрики оператора вызывается лишь один раз в момент определения потока. В результате
// у всех наблюдателей будет общая лексическая область видимости:

/* 
function tapOnce<T>(job: Function): MonoTypeOperatorFunction<T> {
  let isFirst = true;

  return pipe(
    tap(v => {
      if (!isFirst) {
        return;
      }

      job(v);
      isFirst = false;
    })
  );
}

const results$ = initSourse$.pipe(tapOnce(() => console.log("First value emitted")));

results$.subscribe(console.log);
results$.subscribe(console.log);

 */


// Чтобы у каждого наблюдателя была уникальная лексическая область видимости, можно применить функцию defer


// *******************************************************************************************************










































  }
}

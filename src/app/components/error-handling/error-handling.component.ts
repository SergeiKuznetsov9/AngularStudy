import { Component, OnInit } from '@angular/core';
import {
  EMPTY,
  catchError,
  delay,
  interval,
  map,
  of,
  retry,
  switchMap,
  zip,
} from 'rxjs';

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.scss'],
})
export class ErrorHandlingComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const sequence1$ = interval(1000);
    const sequence2$ = of('1', '2', '3', '4', 5, '6', '7', '8', '9', '10');
    const sequence$ = zip(sequence1$, sequence2$);

    // В этом коде допущена ошибка
    /* 
    sequence$.pipe(      
      map( ([x, y]) => (y as any).toUpperCase()
      )
    )
    .subscribe(console.log)
 */

    // Эту ошибку можно обработать try/catch
    /* 
    sequence$
      .pipe(
        map(([x, y]) => {
          try {
            return (y as any).toUpperCase();
          } catch (error) {
            console.log(error);
          }
        })
      )
      .subscribe(console.log);
*/
    // но это метод плохой, т.к. в каждый оператор не засунешь

    // следущий метод - обработать в subscribe
    // Он плох тем, что ошибка прервет поток, дальше он не пойдет
    /*
     sequence$
      .pipe(
        map(([x, y]) => {
          return (y as any).toUpperCase();
        })
      )
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => console.log(e),
        complete: () => console.log('complete'),
      });
*/

    // Для работы с ошибками используют оператор catchError
    /* sequence$
.pipe(
  map(([x, y]) => {
    return (y as any).toUpperCase();
  }),
  // этот оператор словит ошибку, выполнит код и вернет поток, который будет передан дальше по цепочке
  // При этом ошибка до subscribe не дойдет. Операторы после ошибки и до catch - будут пропущены
  catchError( (err) => {
    console.log('ERROR IN OPERATOR', err)
    return of('0')
  })
)
.subscribe({
  next: (v) => console.log(v),
  error: (e) => console.log('ERROR in SUBSCRIBE', e),
  complete: () => console.log('complete'),
}); */

    // return EMPTY - закончит поток после ошибки (т.е. выполнится complete())
    /* catchError( (err) => {
  return EMPTY
}) */

    // существует оператор позволяющий несколько раз повторить код, выдавший ошибку. При этом ошибка будет выкинута только на следующий раз:
    /* sequence$.pipe(
  map(([x, y]) => {
    return (y as any).toUpperCase();
  }),
  retry(3),
  catchError( (err) => {
    console.log('ERROR IN OPERATOR', err)
    return of('0')
  })
)
.subscribe({
  next: (v) => console.log(v),
  error: (e) => console.log('ERROR in SUBSCRIBE', e),
  complete: () => console.log('complete'),
}); */

    // кроме того, из ошибки можно вернуть исходный source

    // оператор retryWhen() позволяет указать условие, по которому повторять код
    // код будет повторен через 5 сек
    // retryWhen( err => err.pipe(delay(5000)) )





    
    // На практике обычно используют HOO. Дело в том, что при отлове ошибки нельзя прекращать поток, поэтому в потоке
    // переключаются на другие потоки. Выглядит это так:

    sequence$
      .pipe(
        // Сразу переключились на новый поток, который состоит из одного значеия родительского потока
        // Если внутри случится ошибка, то прекратится поток, который мы создали. Родительский будет дальше эмитить события
        switchMap(([x, y]) => {
          return of(y).pipe(
            map((y) => {
              return (y as any).toUpperCase();
            }),
            catchError((err) => {
              console.log('ERROR IN OPERATOR', err);
              return EMPTY;
            })
          );
        })
      )
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => console.log('ERROR in SUBSCRIBE', e),
        complete: () => console.log('complete'),
      });
  }
}

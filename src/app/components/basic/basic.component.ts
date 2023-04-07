import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {

    // subscriber - это функция, которая имеет метод next, error и complete 
    
    // !!! эта функция может возвращать нейкую функцию, которая запуститься, если у подписки вызвать
    // метод unsubscribe
    
    // next - эмитит значения



/*
     const sequence$ = new Observable( subscriber => {
      let count = 1;
      const intervalId = setInterval( () => {
        subscriber.next(count++)
        if(count === 20) {
          clearInterval(intervalId);
          subscriber.complete()
        }
      }, 1000)

      return () => {
        console.log('Call returned function')
        clearInterval(intervalId);
      }
    })
    // на observable нужно подписаться, это lazy push коллекция
    const subscription = sequence$.subscribe({
      next: v => console.log(v),
      error: () => {},
      complete: () => console.log('Complete')
    })

    setTimeout(() => {
      subscription.unsubscribe()
    }, 5000);
*/



    // Основное
    // Observable не запустится без подписки
    // Потоки бывают конечные и бесконечные



// *********************************************************************************************

// Потоки можно поделить на холодные и горячие
// Холодный - При подписке на него - получаешь значения с самого начала, а не с момента подписки:


/*
const sequence$ = interval(1000)

const subscription1 = sequence$.subscribe({
  next: (v) => console.log('subs1', v)
})


setTimeout( () => {
  sequence$.subscribe({
    next: (v) => console.log('subs2', v)
  })
}, 3000)
*/


// Горячий - При подписке на него - получаешь значения с момента подписки (пример - клики по кнопке),
// то, что было раньше - не узнаем

// По документации объяснение интереснее:
// Если продьюсер находится внутри Observable, то поток холодный; Если с наружи - то поток горячий


// *********************************************************************************************
























































// *********************************************************************************************
}

}

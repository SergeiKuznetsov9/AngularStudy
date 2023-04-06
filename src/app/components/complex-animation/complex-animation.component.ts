import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-complex-animation',
  templateUrl: './complex-animation.component.html',
  styleUrls: ['./complex-animation.component.scss'],
  animations: [

/*
    Здесь :enter - это краткая запись вот этого: void => *
    Вот это * => void можно записать так: :leave
*/

/*
    Здесь определена анимация appearingItems. Такой код говорит следующее: 
*/


    trigger('appearingItems', [
      transition(':enter', [
        query('ul.users li', [
          style({
            opacity: 0,
            transform: 'translateY(-100px)',
          }),
          stagger(-50, [
            animate(
              '300ms',
              style({ opacity: 1, transform: 'none' })
            ),
          ]),
        ]),
      ]),
    ]),
  ]

})
export class ComplexAnimationComponent {

}

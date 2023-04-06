import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
  AnimationEvent,
  useAnimation
} from '@angular/animations';
import { Component } from '@angular/core';
import { reusableAnimation } from 'src/app/animations/animation';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    /* 
      Функциея trigger() принимает два аргумента - имя анимации и массив с определением
      состояний и описанием их смены.
    */
    trigger('expandedParagraph', [
    /* 
      Состояние описывается функцией state(). В качестве параметров ей передаются название
      состояния и набор CSS-стилей, задаваемых функцией style(). 
    */

    /*
      Вместо * можно поставить любую величину и анимация будет происходить по ней. Если оставить
      *, то величина будет определена из CSS
    */
      state('initial', style({ height: 0 })),
      state('expanded', style({ height: '*' })),
    /*
      Для указания всех состояний используйте *. Например, если анимация должна срабатывать
      при переходе с initial на любое другое состояние, то это указывается так:
      'initial <=> *'

      Анимирование смены всех состояний:
      transition('* => *', animate('0.3s'))
    */

    /* 
      Функция transition() является аналогом одноименного CSS-свойства и описывает при смене с какого
      на какое состояние должна срабатывать анимация. Первый параметр - строка с указанием изменяемых
      состояний, второй - параметры и (или) стили анимации, указываемые функциями animate() или style().

      <=> - краткая запись указания, что анимация должна отработать в обе стороны
    */
      transition('initial <=> expanded', animate('1s')),
    ]),

    /*    
      Еще имеется особое состояние void. Оно используется для обозначения элементов, которых еще
      нет в представлении. Частое использование void - анимированное появление/исчезновение элемента
      совместно с *ngIf.
    */

    trigger('displayingAnything', [
      transition('void => *', [
        style({opacity: 0}),
        animate('1.2s', style({opacity: 1})),
      ]),
      transition('* => void', [

        /*
          Функция animate() принимает строку с тремя параметрами:
          длительность анимации;
          время задержки перед стартом анимации;
          easing.
        */
        animate('1.2s', style({opacity: 0})),
      ])

    ]),

    /*
      Для определения Angular animation, которая в процессе смены состояний должна применять
      промежуточные стили, используется функция keyframes(), принимающая массив промежуточных
      стилей, определенных с помощью style().
    */

    trigger('displayingWithEasing', [
      state('initial', style({ fontSize: '16px' })),
      state('expanded', style({ fontSize: '48px' })),
      transition('initial <=> expanded', animate('2s', keyframes([
        style({fontSize: '16px', offset: 0}),
        style({fontSize: '24px', offset: .2}),
        style({fontSize: '36px', offset: .4}),
        style({fontSize: '44px', offset: .6}),
        style({fontSize: '14px', offset: .9}),
        style({fontSize: '48px', offset: 1}),
      ]))),
    ]),




    /*
      Пример использования сторонней анимации
    */

      trigger('reusableAnimation', [

    /*
      Функция useAnimation() принимает два параметра: первый - анимация, определенная для
      переиспользования, второй - объект, в свойстве params которого указываются значения параметров.
    */
        transition('initial => expanded', useAnimation(reusableAnimation, {
            params: {
                backgroundColor: 'red',
                fontSize: '16px',
                time: '1s',
                width: '100%'
            }
        }))
    ])

  ],
})
export class MainComponent {
  isExpanded: boolean = false;
  state: string = 'initial';
  isVisible: boolean = false;
  
  isFontExpanded: boolean = false;
  stateForFontJumping: string = 'initial';
  
  isReusableAnimationStart: boolean = false;
  stateForReusableAnimation: string = 'initial';

  expand() {
    this.isExpanded = !this.isExpanded;
    this.state = this.isExpanded ? 'expanded' : 'initial';
  }

  fontExpand() {
    this.isFontExpanded = !this.isFontExpanded;
    this.stateForFontJumping = this.isFontExpanded ? 'expanded' : 'initial';
  }

  animateStart(event: AnimationEvent) {
    console.log('animate started', event)
  }
  animateDone(event: AnimationEvent) {
    console.log('animate done', event)
  }

  startReusableAnimation() {
    this.isReusableAnimationStart = !this.isReusableAnimationStart;
    this.stateForReusableAnimation = this.isReusableAnimationStart ? 'expanded' : 'initial';
  }
}

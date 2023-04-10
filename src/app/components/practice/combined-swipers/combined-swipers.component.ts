import { AfterViewInit, Component,ViewChild } from '@angular/core';
import { Observable, combineLatest, fromEvent, map, startWith, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-combined-swipers',
  templateUrl: './combined-swipers.component.html',
  styleUrls: ['./combined-swipers.component.scss']
})
export class CombinedSwipersComponent implements AfterViewInit {

  @ViewChild('inp1') inp1: any;
  @ViewChild('inp2') inp2: any;
  @ViewChild('inp3') inp3: any;
  @ViewChild('button') button: any;

  constructor() {}

  ngAfterViewInit() {

    // Создаем стрим из значений, получаемых от ползунков:
    const emitChangesInp1$ = getValue(fromEvent(this.inp1.nativeElement, 'change'))
    const emitChangesInp2$ = getValue(fromEvent(this.inp2.nativeElement, 'change'))
    const emitChangesInp3$ = getValue(fromEvent(this.inp3.nativeElement, 'change'))


    // Функция, участвующая в создании стрима значений. Поскольку изначально значений никаких не сэмитированно, 
    // в ручную эмитим нулевые значения. Это нужно для того, чтобы когда мы скомбинировали потоки, у нас после
    // первого же взаимодействия с одним из ползунков, были сэмитированы некоторые значения
    function getValue(source$: Observable<any>) {
      return source$
        .pipe(
          map( (element: any) => +element.target.value),
          startWith(0)
        )
    }

    // Комбинируем потоки:
    const combinedSources$ = combineLatest([emitChangesInp1$, emitChangesInp2$, emitChangesInp3$])


    // К примеру, мы хотим получать значения ползунков лишь по кнопке. В таком случае создаем кнопку, 
    // начинаем слушать ее клики и в пайпе на первом шаге добавляем последнее значение из скобинированых
    // потоков
    fromEvent(this.button.nativeElement as HTMLButtonElement, 'click')
      .pipe(
        withLatestFrom(combinedSources$),
        map( e => e[1])
      )
      .subscribe(console.log)
      


  }

}


























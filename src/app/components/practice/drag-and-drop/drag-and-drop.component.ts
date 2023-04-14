import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { concatMap, fromEvent, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements AfterViewInit {

  @ViewChild('draggable') draggable!: ElementRef<HTMLDivElement>;

  constructor() {}

  ngAfterViewInit() {

    const mouseDown$ = fromEvent<MouseEvent>(this.draggable.nativeElement, 'mousedown')
    const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove')
    const mouseUp$ = fromEvent<MouseEvent>(this.draggable.nativeElement, 'mouseup')

    // Начинаем реализацию логики с момента нажатия на таргетЭлемент
    mouseDown$.pipe(
      // как только нажатие осуществлено, переключаемся на отслеживание другого потока
      // и в данной итерации забываем про предыдущий.
      // Как нельзя лучше подойдет concatMap. Он последовательно обрабатывает все эмиты начального источника.
      // Обработка следующего начинается после окончания эмита нового потока
      concatMap( startEvent => {
        return mouseMove$.pipe(
          // теперь мы слушаем поток событий движения мыши          
          map( moveEvent => {
            moveEvent.preventDefault();
            // Здесь мы формируем объект с координатами изменений курсора после нажати
            return {
              left: moveEvent.clientX - startEvent.offsetX,
              top: moveEvent.clientY - startEvent.offsetY
            }            
          }),
          // теперь нам нужно как то закрыть прослушивание этого события
          // но это нужно сделать только после mouseUp
          // Для этого существует оператор takeUntil. В качестве аргумента передаем туда поток mouseUp
          // В результате прослушивание завершится как только mouseUp заэмитит значение
          takeUntil(mouseUp$)
        )
      })
    ).subscribe( position => {
      // получаем position и меняем стили:
      this.draggable.nativeElement.style.left = `${position.left}px`
      this.draggable.nativeElement.style.top = `${position.top}px`
    })
 

  }


}

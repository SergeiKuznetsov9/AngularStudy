import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, bufferCount, concatAll, debounce, debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-live-searching',
  templateUrl: './live-searching.component.html',
  styleUrls: ['./live-searching.component.scss'],
})
export class LiveSearchingComponent implements AfterViewInit {
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  constructor() {}

  ngAfterViewInit() {

    // Вот такой код для отправки запроса и получения результатов
/* 
    const source$ = fromEvent<KeyboardEvent>(this.inputRef.nativeElement, 'input').pipe(
      debounceTime(400),
      map<KeyboardEvent, string>((el) => (el.target as HTMLInputElement).value),
      filter<string>( val => val.length > 3),
      // Не реагировать на дублирование имтируемого значения 
      distinctUntilChanged(),
      // Переключаемся на другой поток
      switchMap( value => {
        return ajax(`https://api.github.com/search/repositories?q=${value}`).pipe(
          map( (el: any) => el.response.items)
        )

      })
    );

    source$.subscribe(console.log);
*/

// Это все можно декомпозировать:

function request(value: string) {
  return ajax(`https://api.github.com/search/repositories?q=${value}`).pipe(
    map( (el: any) => el.response.items),
    // раскладывает массив на поток (потипу from([]))
    concatAll(),
    // группируем элементы в массивы по три штуки
    bufferCount(3),
  )
}

function handleInputEventForRequest(source$: Observable<KeyboardEvent>)  {
  return source$.pipe(
    debounceTime(400),
    map<KeyboardEvent, string>((el) => (el.target as HTMLInputElement).value),
    filter<string>( val => val.length > 3),
    distinctUntilChanged(),
    switchMap(request)
  )
}

const source$ = fromEvent<KeyboardEvent>(this.inputRef.nativeElement, 'input')

source$.pipe(
  handleInputEventForRequest
).subscribe(console.log)






























  }
}

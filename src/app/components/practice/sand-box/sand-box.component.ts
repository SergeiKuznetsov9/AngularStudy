import { AfterViewInit, Component,ViewChild } from '@angular/core';
import { Observable, combineLatest, fromEvent, map, startWith } from 'rxjs';

@Component({
  selector: 'app-sand-box',
  templateUrl: './sand-box.component.html',
  styleUrls: ['./sand-box.component.scss']
})
export class SandBoxComponent implements AfterViewInit {
  @ViewChild('inp1') inp1: any;
  @ViewChild('inp2') inp2: any;
  @ViewChild('inp3') inp3: any;

  constructor() {}

  /* 3.38 */
  ngAfterViewInit() {
    const emitChangesInp1$ = getValue(fromEvent(this.inp1.nativeElement, 'change'))
    const emitChangesInp2$ = getValue(fromEvent(this.inp2.nativeElement, 'change'))
    const emitChangesInp3$ = getValue(fromEvent(this.inp3.nativeElement, 'change'))

    function getValue(source$: Observable<any>) {
      return source$
        .pipe(
          map( (element: any) => element.target.value),
          startWith('0')
        )
    }

    const combinedSources$ = combineLatest([emitChangesInp1$, emitChangesInp2$, emitChangesInp3$])


    combinedSources$.subscribe(console.log)
/*     function getX2Value(source$: Observable<any>) {
      return source$
        .pipe(
          map( (element: any) => element * element)
        )
    } */



/*     emitChangesInp1$.subscribe(console.log)
    emitChangesInp2$.subscribe(console.log)
    emitChangesInp3$.subscribe(console.log) */
  }


}

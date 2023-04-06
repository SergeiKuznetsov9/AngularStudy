import { animate, animation, style } from "@angular/animations";

export const reusableAnimation = animation([
  style({

    /*
      В двойных фигурных скобках описаны параметры, передаваемые анимации при ее вызове
      через useAnimation(). Также допустимо использование константных значений.
    */
    backgroundColor: '{{ backgroundColor }}',
    fontSize: '{{ fontSize }}',
    width: '{{ width }}',
  }),
  animate('{{ time }}'),
])
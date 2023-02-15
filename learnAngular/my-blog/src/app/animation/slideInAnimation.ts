import {
  animate,
  animation,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';
export const transitionAnimation = animation([
  style({
    height: '{{ height }}',
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}',
  }),
  animate('{{ time }}'),
]);

export const slideInAnimation = trigger('routerAnimations', [
  transition('ArticlePage <=> TagPage', [
    style({ position: 'relative' }),
    query(':enter , :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
  ]),
]);

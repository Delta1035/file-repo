import {
  style,
  transition,
  trigger
} from '@angular/animations';

export const routerAnimations = trigger('routerAnimations', [
  transition(
    'ArticlePage => CategoryPage',
    style({
      opacity:0,
      backgroundColor:'red'
    }),
    // animate('1s 500ms ease-in')
)])

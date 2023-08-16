import { trigger,transition,style,animate } from "@angular/animations";

export const slide = trigger('slide',[
  transition("void => *",[
    style({ opacity: 0,transform: "translateY(100px)" }),
    animate(250,style({
      opacity: 1,
      transform: 'translateY(0)'
    }))
  ]),
  transition("* => void",[
    style({ opacity: 1,transform: "translateY(0)" }),
    animate("600ms 1s ease-out",style({
      opacity: 0,
      transform: 'translateY(-100px)'
    }))
  ])
]);

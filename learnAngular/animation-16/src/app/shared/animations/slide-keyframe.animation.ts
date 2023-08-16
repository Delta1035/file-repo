import { animate,keyframes,style,transition,trigger } from
  "@angular/animations";
export const slideKeyframe = trigger("slideKeyframe",[
  transition(":enter",[
    style({ opacity: 0,transform: "translateY(40px)" }),
    animate(250)
  ]),
  transition(":leave",[
    animate(
      600,
      keyframes([
        style({ offset: 0.3,opacity: 0.3,transform: "translateX(-80px)" }),
        style({ offset: 1,opacity: 1,transform: "translateX(100%)" })
      ])
    )
  ])
]);

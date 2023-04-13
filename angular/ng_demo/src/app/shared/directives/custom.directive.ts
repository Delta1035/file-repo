import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { debounceTime, filter, fromEvent, map, pairwise } from 'rxjs';

@Directive({
  selector: '[appCustom]',
})
export class CustomDirective implements OnInit {
  @HostBinding('class.red')
  red() {
    return true;
  }
  e = this.ele.nativeElement;
  constructor(private render: Renderer2, private ele: ElementRef) {}
  ngOnInit(): void {
    this.init();
    this.initDoubleClick();
  }

  init() {
    this.render.setStyle(this.e, 'border', '1px solid lightblue');
  }

  @HostListener('mouseover')
  handleMouseOver() {
    this.render.setStyle(this.e, 'backgroundColor', 'lightblue');
  }

  @HostListener('mouseleave')
  handleMouseLeave() {
    this.render.removeStyle(this.e, 'backgroundColor');
  }

  @HostListener('click', ['$event'])
  handleClick(e: MouseEvent) {
    if (e.target instanceof HTMLElement)
      console.log('鼠标单击了', e.target.tagName);
  }

  initDoubleClick() {
    const click$ = fromEvent(this.e, 'click');
    const r$ = click$.pipe(
      map((v) => Date.now()),
      pairwise(),
      filter((x) => {
        return x[1] - x[0] < 500;
      }),
      debounceTime(500)
    );

    r$.subscribe({
      next: (data) => {
        console.log('鼠标双击了：', data[1] - data[0]);
      },
    });
  }
}

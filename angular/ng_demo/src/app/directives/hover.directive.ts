import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective implements AfterViewInit {
  @Input()
  color = 'red';
  @Input()
  bgColor = 'gray';
  constructor(private el: ElementRef, private render: Renderer2) {}
  ngAfterViewInit(): void {}

  @HostListener('mouseover')
  onHover() {
    this.render.setStyle(this.el.nativeElement, 'color', this.color);
    this.render.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      this.bgColor
    );
  }

  @HostListener('mouseleave')
  onLeave() {
    this.render.removeStyle(this.el.nativeElement, 'color');
    this.render.removeStyle(this.el.nativeElement, 'backgroundColor');
  }
}

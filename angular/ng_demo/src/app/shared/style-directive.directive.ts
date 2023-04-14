import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[styleDirective]',
  exportAs: 'clickedTag',
})
export class StyleDirectiveDirective {
  clickedTagName!: string;
  e!: HTMLElement;
  constructor(private eleRef: ElementRef, private render: Renderer2) {
    this.e = this.eleRef.nativeElement;
    this.addDefaultStyle(this.e);
  }

  @HostListener('mouseover')
  handleMouseover() {
    this.addHoverStyle(this.e);
  }

  @HostListener('mouseleave')
  handleMouseleave() {
    this.addDefaultStyle(this.e);
  }

  @HostListener('click', ['$event'])
  handleClick(e: MouseEvent) {
    if (e) {
      this.clickedTagName = (e.target as HTMLElement).tagName;
    }
  }

  addDefaultStyle(e: HTMLElement) {
    this.render.setStyle(e, 'color', 'black');
    this.render.setStyle(e, 'backgroundColor', 'white');
    this.render.setStyle(e, 'border', '1px solid black');
  }

  addHoverStyle(e: HTMLElement) {
    this.render.setStyle(e, 'color', 'blue');
    this.render.setStyle(e, 'backgroundColor', 'gray');
    this.render.setStyle(e, 'border', '1px solid blue');
  }
}

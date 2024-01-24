import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHoverClasses]',
  standalone: true
})
export class HoverClassesDirective {

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2
  ) { }

  @Input('appHoverClasses') hoverClasses!: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.hoverClasses.split(' ').forEach((className) => {
      this._renderer.addClass(this._elementRef.nativeElement, className);
    });
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hoverClasses.split(' ').forEach((className) => {
      this._renderer.removeClass(this._elementRef.nativeElement, className);
    });
  }
}

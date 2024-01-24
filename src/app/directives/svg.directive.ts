import {ChangeDetectorRef, Directive, ElementRef, HostBinding, Input, OnChanges, Renderer2} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Subject} from 'rxjs';
import {SvgService} from '../services/svg.service';

@Directive({
  selector: '[appSvg]',
  standalone: true,
})
export class SvgDirective implements OnChanges {

  @Input({required: true}) name!: string;
  @Input() @HostBinding('attr.aria-label') arialLabel!: string;

  private _onChanges = new Subject<SVGElement | undefined>();

  constructor(
    private _el: ElementRef,
    private _cdr: ChangeDetectorRef,
    private _renderer: Renderer2,
    private _svgService: SvgService
  ) {
    this._onChanges.pipe(
      takeUntilDestroyed()
    ).subscribe((svg) => {

      if (!svg) {
        return;
      }

      const nativeElement: HTMLElement = this._el.nativeElement
      nativeElement.innerHTML = '';

      if (!svg.hasAttribute('viewBox')) {
        if (svg.hasAttribute('width') && svg.hasAttribute('height')) {
          this._renderer.setAttribute(nativeElement, 'viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
        }
      }

      // copy all attributes

      svg.getAttributeNames().forEach((attrName) => {
        this._renderer.setAttribute(nativeElement, attrName, svg.getAttribute(attrName)!);
      });

      // append all elements

      svg.childNodes.forEach((node) => {
        this._renderer.appendChild(nativeElement, node.cloneNode());
      });

      this._cdr.markForCheck();
    });
  }

  ngOnChanges(): void {
    this._onChanges.next(this._svgService.getSvg(this.name));
  }
}

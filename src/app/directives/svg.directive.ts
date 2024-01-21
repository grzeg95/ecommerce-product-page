import {HttpClient} from '@angular/common/http';
import {ChangeDetectorRef, Directive, ElementRef, HostBinding, Input, OnChanges, Renderer2} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Subject, switchMap} from 'rxjs';
import {DomPurifyService} from '../services/dom-purify.service';

@Directive({
  selector: '[appSvg]',
  standalone: true,
})
export class SvgDirective implements OnChanges {

  @Input() src!: string;
  @Input() @HostBinding('attr.aria-label') arialLabel!: string;

  private _onChanges = new Subject();

  constructor(
    private _el: ElementRef,
    private _http: HttpClient,
    private _cdr: ChangeDetectorRef,
    private _domPurifyService: DomPurifyService,
    private _renderer: Renderer2
  ) {
    this._onChanges.pipe(
      takeUntilDestroyed(),
      switchMap(() => {
        return this._http.get(this.src, {responseType: 'text'})
      })
    ).subscribe((text) => {

      const nativeElement: HTMLElement = this._el.nativeElement

      nativeElement.innerHTML = '';

      const temp = document.createElement('template');
      temp.innerHTML = this._domPurifyService.sanitize(text);

      const svg = temp.content.childNodes.item(0) as SVGElement;

      if (!svg.hasAttribute('viewBox')) {

        if (svg.hasAttribute('width') && svg.hasAttribute('height')) {
          this._renderer.setAttribute(nativeElement, 'viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
          this._renderer.removeAttribute(svg, 'width');
          this._renderer.removeAttribute(svg, 'height');
        }

      } else {
        this._renderer.removeAttribute(svg, 'width');
        this._renderer.removeAttribute(svg, 'height');
      }

      // copy all attributes

      svg.getAttributeNames().forEach((attrName) => {
        this._renderer.setAttribute(nativeElement, attrName, svg.getAttribute(attrName)!);
      });

      // append all elements

      svg.childNodes.forEach((node) => {
        this._renderer.appendChild(nativeElement, node);
      });

      this._cdr.markForCheck();
    });
  }

  ngOnChanges(): void {
    this._onChanges.next(this.src);
  }
}

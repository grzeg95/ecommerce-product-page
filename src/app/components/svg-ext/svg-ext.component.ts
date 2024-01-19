import {HttpClient} from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Subject, switchMap} from 'rxjs';
import {DomPurifyService} from '../../services/dom-purify.service';

@Component({
  selector: 'app-svg-ext',
  standalone: true,
  templateUrl: './svg-ext.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SvgExtComponent implements OnChanges {

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
          svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
          svg.removeAttribute('width');
          svg.removeAttribute('height');
        }

      } else {
        svg.removeAttribute('width');
        svg.removeAttribute('height');
      }

      this._renderer.appendChild(nativeElement, svg);

      this._cdr.markForCheck();
    });
  }

  ngOnChanges(): void {
    this._onChanges.next(this.src);
  }
}

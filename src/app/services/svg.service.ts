import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs';
import {DomPurifyService} from './dom-purify.service';

@Injectable({
  providedIn: 'root'
})
export class SvgService {

  private _svgs = new Map<string, SVGElement>();

  constructor(
    private _http: HttpClient,
    private _domPurifyService: DomPurifyService
  ) {
  }

  getSvg(name: string) {
    return this._svgs.get(name);
  }

  registerSvg(src: string, name: string) {
    return this._http.get(src, {responseType: 'text'}).pipe(
      tap((text) => {

        const temp = document.createElement('template');
        temp.innerHTML = this._domPurifyService.sanitize(text);

        const svg = temp.content.childNodes.item(0) as SVGElement;

        this._svgs.set(name, svg);
      })
    );
  }
}

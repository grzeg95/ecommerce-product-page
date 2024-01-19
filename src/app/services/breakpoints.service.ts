import {BreakpointObserver} from '@angular/cdk/layout';
import {Injectable, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Breakpoints, BreakpointsMin} from '../models/breakepoints';

@Injectable({
  providedIn: 'root'
})
export class BreakpointsService {

  private _displayNameMap = new Map([
    [Breakpoints.mobile.selector, BreakpointsMin.mobile],
    [Breakpoints.desktop.selector, BreakpointsMin.desktop],
  ]);

  private _currentScreenSize = signal<number | undefined>(undefined);

  get currentScreenSize() {
    return this._currentScreenSize.asReadonly();
  }

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([
        Breakpoints.mobile.selector,
        Breakpoints.desktop.selector
      ])
      .pipe(takeUntilDestroyed())
      .subscribe(result => {

        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this._currentScreenSize.set(this._displayNameMap.get(query));
          }
        }
      });
  }
}

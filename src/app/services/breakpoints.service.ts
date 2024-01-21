import {BreakpointObserver} from '@angular/cdk/layout';
import {computed, Injectable, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Breakpoints} from '../models/breakepoints';

@Injectable({
  providedIn: 'root'
})
export class BreakpointsService {

  private _displayNameMap = new Map([
    [Breakpoints.phone.selector, 'phone'],
    [Breakpoints.tablet.selector, 'tablet'],
    [Breakpoints.desktop.selector, 'desktop'],
  ]);

  private _currentScreenSize = signal<string | undefined>(undefined);

  isOnPhone = computed(() => {
    return !!['phone'].find((screenSize) => screenSize === this._currentScreenSize() || '');
  });

  isOnTablet = computed(() => {
    return !!['tablet'].find((screenSize) => screenSize === this._currentScreenSize() || '');
  });

  isOnDesktop = computed(() => {
    return !!['desktop'].find((screenSize) => screenSize === this._currentScreenSize() || '');
  });

  isOnTabletAndBellow = computed(() => {
    return !!['tablet', 'phone'].find((screenSize) => screenSize === this._currentScreenSize() || '');
  });

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([
        Breakpoints.phone.selector,
        Breakpoints.tablet.selector,
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

import {BreakpointObserver} from '@angular/cdk/layout';
import {computed, Injectable, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Breakpoints} from '../models/breakepoints';

@Injectable({
  providedIn: 'root'
})
export class BreakpointsService {

  private _displayNameMap = new Map([
    [Breakpoints.extraSmall.selector, 'extraSmall'],
    [Breakpoints.small.selector, 'small'],
    [Breakpoints.medium.selector, 'medium'],
    [Breakpoints.large.selector, 'large'],
    [Breakpoints.extraLarge.selector, 'extraLarge'],
  ]);

  readonly screenSizeNames = ['extraSmall', 'small', 'medium', 'large', 'extraLarge'];
  private _currentScreenSize = signal<string | undefined>(undefined);
  currentScreenSizes = computed(() => {

    const screenSizeNames = [];
    const currentScreenSize = this._currentScreenSize();

    for (const screenSizeName of this.screenSizeNames) {

      screenSizeNames.push(screenSizeName);

      if (screenSizeName === currentScreenSize) {
        break;
      }
    }

    return screenSizeNames;
  });

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([
        Breakpoints.extraSmall.selector,
        Breakpoints.small.selector,
        Breakpoints.medium.selector,
        Breakpoints.large.selector,
        Breakpoints.extraLarge.selector,
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

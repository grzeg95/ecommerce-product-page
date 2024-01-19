import {provideHttpClient} from '@angular/common/http';
import {ApplicationConfig} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {provideThemeSelector} from '@grzeg95/angular-lib-theme-selector';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]),
    provideHttpClient(),
    provideAnimations(),
    provideThemeSelector({
      themes: {
        names: ['orange'],
        default: 'orange'
      }
    })
  ]
};

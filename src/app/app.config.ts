import {HttpClient, provideHttpClient} from '@angular/common/http';
import {mergeMappings} from '@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file';
import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {provideThemeSelector} from '@grzeg95/angular-lib-theme-selector';
import {forkJoin, from, map, mergeAll, mergeMap, of} from 'rxjs';
import {SvgService} from './services/svg.service';

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
    }),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [SvgService, HttpClient],
      useFactory: (svgService: SvgService, httpClient: HttpClient) => {
        return () => {

          return httpClient.get<{name: string, src: string}[]>('/assets/svgs.json').pipe(
            mergeMap((svgs) => {
              return forkJoin(
                svgs.map((svg) => svgService.registerSvg(svg.src, svg.name))
              );
            })
          );

          // const response = await fetch('/assets/svgs.json');
          // const svgs: {name: string, src: string}[] = (await response.json());
          // await Promise.all(svgs.map((svg) => svgService.registerSvg(svg.src, svg.name)))
        }
      }
    }
  ]
};

import {animate, style, transition, trigger} from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({
      opacity: '0'
    }),
    animate('{{duration}} {{timingFunction}}', style({opacity: '1'})),
  ], {params : { duration: '0.3s', timingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}),
  transition(':leave', [
    style({
      opacity: '1'
    }),
    animate('{{duration}} {{timingFunction}}', style({opacity: '0'})),
  ], {params : { duration: '0.3s', timingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }})
]);

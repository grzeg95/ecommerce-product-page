import {animate, style, transition, trigger} from '@angular/animations';

export const slideInOutFromLeft = trigger('slideInOutFromLeft', [
  transition(':enter', [
    style({
      transform: 'translateX(-100%)'
    }),
    animate('{{duration}} {{timingFunction}}', style({
      transform: 'translateX(0%)'
    })),
  ], {params : { duration: '0.3s', timingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}),
  transition(':leave', [
    style({
      transform: 'translateX(0%)'
    }),
    animate('{{duration}} {{timingFunction}}', style({
      transform: 'translateX(-100%)'
    })),
  ], {params : { duration: '0.3s', timingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }})
]);

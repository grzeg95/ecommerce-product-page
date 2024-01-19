import {NgClass} from '@angular/common';
import {ChangeDetectionStrategy, Component, computed, signal, ViewEncapsulation} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {fadeInOut} from '../../animations/fade-in-out';
import {slideInOutFromLeft} from '../../animations/slide-in-out-from-left';
import {HoverClassesDirective} from '../../directives/hover-class.directive';
import {BreakpointsMin} from '../../models/breakepoints';
import {BreakpointsService} from '../../services/breakpoints.service';
import {SvgExtComponent} from '../svg-ext/svg-ext.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    SvgExtComponent,
    RouterLink,
    HoverClassesDirective,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-header'
  },
  animations: [
    slideInOutFromLeft,
    fadeInOut
  ]
})
export class HeaderComponent {

  isAsideShown = signal<boolean>(false);

  isOnMobile = computed(() => {
    return (this._breakpointsService.currentScreenSize() || 0) < BreakpointsMin.desktop;
  });

  links = [
    {
      link: '/collections',
      title: 'Collections'
    },
    {
      link: '/men',
      title: 'Men'
    },
    {
      link: '/women',
      title: 'Women'
    },
    {
      link: '/about',
      title: 'About'
    },
    {
      link: '/contact',
      title: 'Contact'
    }
  ];

  constructor(
    private _breakpointsService: BreakpointsService
  ) {
  }
}

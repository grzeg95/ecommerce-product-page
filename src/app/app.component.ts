import {Component} from '@angular/core';
import {NavComponent} from './components/nav/nav.component';
import {ItemsCatalogDetailsComponent} from './components/items-catalog-details/items-catalog-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavComponent,
    ItemsCatalogDetailsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}

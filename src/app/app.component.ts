import {Component} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {ItemsCatalogDetailsComponent} from './components/items-catalog-details/items-catalog-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    ItemsCatalogDetailsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}

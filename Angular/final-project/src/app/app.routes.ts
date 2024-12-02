import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { BookDetailsComponent } from './book-details/book-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent }, 
  { path: 'books/:id', component: BookDetailsComponent }         
  // { path: '**', redirectTo: '/home' },                 
];

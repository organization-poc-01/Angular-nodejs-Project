import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { SearchComponent } from './search/search.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent }, 
  { path: 'books/:id', component: BookDetailsComponent },         
  { path: 'login', component: LoginComponent },        
  { path: 'register', component: RegisterComponent },
  {path: 'add-book', component: AddBookComponent},        
  { path: 'catalog/edit/:id', component: EditBookComponent },  
  { path: 'search', component: SearchComponent },     
  { path: '**', component: NotFoundComponent },
  // { path: '**', redirectTo: '/home' },                 
];

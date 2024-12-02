import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from '../book/book.component';
import { ApiService } from '../api.service';
import { Book } from '../types/books';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, BookComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  books: Book[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getBooks().subscribe((books) => {
      this.books = books;
      this.isLoading = false;
    });
  }
}

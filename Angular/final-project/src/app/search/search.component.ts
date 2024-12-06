import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { Book } from '../types/books';
import { BookComponent } from '../book/book.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [BookComponent, CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['q']?.toLowerCase() || '';
      this.apiService.getBooks().subscribe((books) => {
        this.books = books;
        this.filteredBooks = this.books.filter((book) =>
          book.title.toLowerCase().includes(searchTerm)
        );
        this.isLoading = false;
      });
    });
  }
}
